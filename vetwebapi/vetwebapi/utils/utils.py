import uuid
from werkzeug.utils import secure_filename

import os
from sqlalchemy.ext.asyncio import AsyncSession
from core.settings import settings
from api_v1.company.crud import create_role
from api_v1.company.animal.crud import (
    create_type_of_feeding,
    create_animal_group,
    create_gender,
    create_species,
    create_usage_type,
    read_types_of_feeding,
    read_animal_groups,
)
from api_v1.company.address.crud import create_region, create_district, create_city, create_street
from api_v1.company.employee.crud import create_position

from core.models import (
    Budget,
    Operation,
    AccountingUnit,
    DrugManufacturer,
    Disease,
    Street,
    AdministrationMethod,
    DisposalMethod,
    PlaceOfAdministration,
    Biomaterial,
    BiomaterialFixation,
    BiomaterialPackage,
    WorkType,
    Dosage,
    DiagnosticMethod,
    Drug,
)


# Address
async def add_districts(session: AsyncSession) -> list[int]:
    """Добавляем Иваново и Ивановский район в таблицу районы в базе данных"""
    region_id: int = await create_region(session=session, name="Ивановская область")
    names = ["Иваново город", "Ивановский район"]
    return [
        await create_district(session=session, region_id=region_id, name=name) for name in names
    ]


async def add_cities(session: AsyncSession) -> tuple[int, int]:
    """Добавляем город Иваново и Кохма в базу данных"""
    districts_ids: list[int] = await add_districts(session=session)
    names = ["Иваново", "Кохма"]
    city1_id = await create_city(session=session, district_id=districts_ids[0], name=names[0])
    city2_id = await create_city(session=session, district_id=districts_ids[1], name=names[1])
    return (city1_id, city2_id)


async def fill_street_table(session: AsyncSession) -> None:
    """Заполняем таблицу с улицами"""
    city_ids: tuple[int, int] = await add_cities(session=session)
    streets_file_path: str = os.path.join(settings.files_dir, "address", "streets.txt")

    await create_street(session=session, city_id=city_ids[1], name="улица Ивановская")
    with open(streets_file_path, encoding="utf16") as f:
        session.add_all([Street(city_id=city_ids[0], name=street) for street in f])
        await session.commit()


# Employees
async def add_roles(session: AsyncSession) -> None:
    """Добавляем роли пользователей в базу данных"""
    names = ["admin", "user"]
    for name in names:
        await create_role(session=session, name=name)


async def add_positions(session: AsyncSession) -> None:
    """Добавляем должности работников в базу данных"""
    names = ["ветврач", "ведущий ветврач", "кавалерист", "ИП", "гр", "начальник"]
    for name in names:
        await create_position(session=session, name=name)


# Animals
async def add_type_of_feeding(session: AsyncSession) -> None:
    names = [
        "Травоядные",
        "Дикие плотоядные",
        "Домашние плотоядные",
        "Птицы",
        "Всеядные",
        "Грызуны",
    ]
    types_of_feedings_ids = [
        await create_type_of_feeding(session=session, name=name) for name in names
    ]
    await add_animals_group(session=session, type_of_feeding_id=types_of_feedings_ids[0])


async def add_animals_group(session: AsyncSession, type_of_feeding_id: int) -> None:
    horse_group_ids = await create_animal_group(
        session=session, type_of_feeding_id=type_of_feeding_id, name="Лошади"
    )
    cows_groups_ids = await create_animal_group(
        session=session, type_of_feeding_id=type_of_feeding_id, name="Крупный рогатый скот"
    )
    await add_horses_species(session=session, horse_group_id=horse_group_ids)
    await add_cows_species(session=session, cows_group_id=cows_groups_ids)


async def add_usage_types(session: AsyncSession) -> None:
    names = ["пользовательное", "племенное", "спортивное"]
    for name in names:
        await create_usage_type(session=session, name=name)


async def add_horses_species(session: AsyncSession, horse_group_id: int) -> None:
    names = ["Лошади", "Пони"]
    horse_species_ids = [
        await create_species(session=session, animal_group_id=horse_group_id, name=name)
        for name in names
    ]
    await add_horse_genders(session=session, species_ids=horse_species_ids)


async def add_cows_species(session: AsyncSession, cows_group_id: int) -> None:
    names = [
        "Крупный рогатый скот",
        "Як домашний",
        "Зубр европейский",
        "Олень пятнистый",
        "Олень северный",
        "Лань европейская",
    ]
    cows_species_ids = [
        await create_species(session=session, animal_group_id=cows_group_id, name=name)
        for name in names
    ]
    await add_cows_genders(session=session, species_ids=cows_species_ids)


async def add_horse_genders(session: AsyncSession, species_ids: list[int]) -> None:
    names = ["жеребец", "кобыла", "мерин"]
    for id in species_ids:
        [await create_gender(session=session, name=name, species_id=id) for name in names]


async def add_cows_genders(session: AsyncSession, species_ids: list[int]) -> None:
    names = ["бык", "корова", "телка", "бычок", "самец", "самка"]
    for id in species_ids:
        [await create_gender(session=session, name=name, species_id=id) for name in names]


# Drugs
async def add_budgets(session: AsyncSession) -> None:
    budgets = ["федеральный", "областной", "коммерческий"]
    session.add_all([Budget(name=name) for name in budgets])
    await session.commit()


async def add_operations(session: AsyncSession) -> None:
    operations = ["приход", "расход", "утилизация"]
    session.add_all([Operation(name=name) for name in operations])
    await session.commit()


async def add_accounting_units(session: AsyncSession) -> None:
    units = ["доз", "тыс.доз", "мл", "флакон", "литры", "кг"]
    session.add_all([AccountingUnit(name=name) for name in units])
    await session.commit()


async def add_drug_manufacturers(session: AsyncSession) -> None:
    file_path = os.path.join(settings.files_dir, "vet_work", "drugs", "drug_manufacturers.txt")
    with open(file_path, encoding="utf-8") as f:
        session.add_all([DrugManufacturer(name=name.strip()) for name in f])
        await session.commit()


async def add_administration_methods(session: AsyncSession) -> None:
    methods = [
        "внутримышечного",
        "подкожного",
        "внутрикожного",
        "интрапальпебрального",
        "внутривенного",
        "орошение",
        "наружного",
        "внутреннего",
        "инстилляции",
    ]
    session.add_all([AdministrationMethod(name=method) for method in methods])
    await session.commit()


async def add_disposal_methods(session: AsyncSession) -> None:
    methods = [
        "кипячения в течение 120 минут",
        "кипячения в течение 30 минут",
        "автоклавирования",
        "водопроводной водой",
    ]
    session.add_all([DisposalMethod(name=method) for method in methods])
    await session.commit()


async def add_dosages(session: AsyncSession) -> None:
    dosages = [
        "1 см куб. мелким собакам и кошкам, 2см куб. крупным собакам",
        "1 см куб. на голову",
        "2 см куб. на голову",
        "лошади, крс, олени, верблюды 1 см куб. на голову, мрс 0,5 см куб. на голову",
        "0,2 см куб. на голову",
        "4,5 г на 100 кг ЖМ",
        "крс 5 см куб, мрс 3 см куб., лошади 2 см куб.",
    ]
    session.add_all([Dosage(name=item) for item in dosages])
    await session.commit()


async def add_places_of_administration(session: AsyncSession) -> None:
    items = [
        "нижней трети шеи слева",
        "средней трети шеи слева",
        "верхней трети шеи слева",
        "крупа",
        "холки",
        "конъюнктивы нижнего века левого глаза",
        "конъюнктивы нижнего века правого глаза",
    ]
    session.add_all([PlaceOfAdministration(name=item) for item in items])
    await session.commit()


async def add_drugs_data(session: AsyncSession) -> None:
    await add_budgets(session=session)
    await add_operations(session=session)
    await add_accounting_units(session=session)
    await add_drug_manufacturers(session=session)
    await add_administration_methods(session=session)
    await add_disposal_methods(session=session)
    await add_dosages(session=session)
    await add_places_of_administration(session=session)


# Vet_work
async def add_diseases(session: AsyncSession) -> None:
    file_path = os.path.join(settings.files_dir, "vet_work", "diseases.txt")

    with open(file_path, encoding="utf-8") as f:
        session.add_all([Disease(name=name.strip()) for name in f])
        await session.commit()


async def add_biomaterial_fixations(session: AsyncSession) -> None:
    items = ["заморозка"]
    session.add_all([BiomaterialFixation(name=name) for name in items])
    await session.commit()


async def add_biomaterial_packages(session: AsyncSession) -> None:
    items = ["пробирка", "полиэтиленовый пакет"]
    session.add_all([BiomaterialPackage(name=name) for name in items])
    await session.commit()


async def add_biomaterial(session: AsyncSession) -> None:
    items = [
        "кусочки селезенки",
        "кал",
        "сыворотка крови",
        "патматериал",
        "труп",
        "цельная кровь",
        "голова",
    ]
    session.add_all([Biomaterial(name=name) for name in items])
    await session.commit()


async def add_work_types(session: AsyncSession) -> None:
    items = ["вакцинация", "диагностика", "обработка", "дезинфекция", "дезинсекция", "дератизация"]

    session.add_all([WorkType(name=name) for name in items])
    await session.commit()


async def add_diagnostic_methods(session: AsyncSession) -> None:
    methods = [
        "серологический",
        "аллергический",
        "бактериологический",
        "гематологический",
        "ПЦР",
        "люмдиагностика",
        "вирусологический",
    ]
    session.add_all([DiagnosticMethod(name=name) for name in methods])
    await session.commit()


async def add_vet_works_data(session: AsyncSession) -> None:
    await add_diseases(session=session)
    await add_biomaterial_fixations(session=session)
    await add_biomaterial_packages(session=session)
    await add_biomaterial(session=session)
    await add_work_types(session=session)
    await add_diagnostic_methods(session=session)


async def prepare_db(session: AsyncSession) -> None:
    """Подготовка базы данных при первом запуске"""
    await fill_street_table(session=session)
    await add_positions(session=session)
    await add_type_of_feeding(session=session)
    await add_usage_types(session=session)
    await add_drugs_data(session=session)
    await add_vet_works_data(session=session)
    await add_roles(session=session)


async def prepare_filename(filename: str) -> str:
    """Change filename to secure unique filename"""
    filename_splitted = filename.split(".")
    name, extension = str(uuid.uuid4()), filename_splitted[1]
    return secure_filename(name + "." + extension)
