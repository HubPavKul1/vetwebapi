import os
from sqlalchemy.ext.asyncio import AsyncSession
from vetwebapi.core.settings import settings
from vetwebapi.api_v1.company.crud import create_role
from vetwebapi.api_v1.company.animal.crud import create_type_of_feeding, create_animal_group, create_gender, create_species, create_usage_type
from vetwebapi.api_v1.company.address.crud import create_region, create_district, create_city, create_street
from vetwebapi.api_v1.company.employee.crud import create_position

from vetwebapi.core.models import Budget, Operation, AccountingUnit, DrugManufacturer, Disease, Street


# Address
async def add_districts(session: AsyncSession) -> list[int]:
    """Добавляем Иваново и Ивановский район в таблицу районы в базе данных"""
    region_id: int = await create_region(session=session, name="Ивановская область")
    names = ["Иваново город", "Ивановский район"]
    return [await create_district(session=session, region_id=region_id, name=name) for name in names]
    
    
async def add_cities(session: AsyncSession) -> tuple[int]:
    """Добавляем город Иваново и Кохма в базу данных"""
    districts_ids: list[int] = await add_districts(session=session)
    names = ["Иваново", "Кохма"]
    city1_id = await create_city(session=session, district_id=districts_ids[0], name=names[0])
    city2_id = await create_city(session=session, district_id=districts_ids[1], name=names[1])
    return (city1_id, city2_id)


async def fill_street_table(session: AsyncSession) -> None:
    """Заполняем таблицу с улицами"""
    city_ids: tuple[int] = await add_cities(session=session)
    streets_file_path: str = os.path.join(settings.files_dir, "address", "streets.txt")
    
    await create_street(session=session, city_id=city_ids[1], name="улица Ивановская")
    with open(streets_file_path, encoding="utf16") as f:
        session.add_all([Street(city_id=city_ids[0], name=street) for street in f])
        await session.commit()
        
            
# Employees            
async def add_roles(session: AsyncSession) -> None:
    """Добавляем роли пользователей в базу данных"""
    names = ["admin", "user"]
    [await create_role(session=session, name=name) for name in names]
    
    
async def add_positions(session: AsyncSession) -> None:
    """Добавляем должности работников в базу данных"""
    names = ["ветврач", "ИП", "гр"]
    [await create_position(session=session, name=name) for name in names]
    

# Animals
async def add_type_of_feeding(session: AsyncSession) -> list[int]:
    names = ["Травоядные", "Дикие плотоядные", "Домашние плотоядные", "Птицы", "Всеядные", "Грызуны"]
    return [await create_type_of_feeding(session=session, name=name) for name in names]

async def add_horses_group(session: AsyncSession) -> int:
    type_of_feeding_ids = await add_type_of_feeding(session=session)
    return await create_animal_group(session=session, type_of_feeding_id=type_of_feeding_ids[0], name="Лошади")

 
async def add_usage_types(session: AsyncSession) -> None:
    names = ["пользовательное", "племенное", "спортивное"]
    [await create_usage_type(session=session, name=name) for name in names]
    
async def add_species(session: AsyncSession) -> list[int]:
    animal_group_id = await add_horses_group(session=session)
    names = ["Лошади", "Пони"]
    return [await create_species(session=session, animal_group_id=animal_group_id, name=name) for name in names]
    
    
async def add_genders(session: AsyncSession) -> None:
    names = ["жеребец", "кобыла", "мерин"]
    [await create_gender(session=session, name=name, species_id=1) for name in names]
    
    
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
    with open (file_path, encoding="utf-8") as f:
        session.add_all([DrugManufacturer(name=name.strip()) for name in f])
        await session.commit()
        
async def add_drugs_data(session: AsyncSession) -> None:
    await add_budgets(session=session)
    await add_operations(session=session)
    await add_accounting_units(session=session)
    await add_drug_manufacturers(session=session)
    
    
# Vet_work
async def add_diseases(session: AsyncSession) -> None:
    file_path = os.path.join(settings.files_dir, "vet_work", "diseases.txt")
    
    with open (file_path, encoding="utf-8") as f:
        session.add_all([Disease(name=name.strip()) for name in f])
        await session.commit()
        
            
async def prepare_db(session: AsyncSession) -> None:
    """Подготовка базы данных при первом запуске"""
    await fill_street_table(session=session)
    await add_positions(session=session)
    await add_usage_types(session=session)
    await add_species(session=session)
    await add_genders(session=session)
    await add_diseases(session=session)
    await add_drugs_data(session=session)
    await add_roles(session=session)
    
    
