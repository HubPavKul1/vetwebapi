from sqlalchemy.ext.asyncio import AsyncSession
from vetwebapi.core.models.companies.region import Region
from vetwebapi.core.models.companies.district import District
from vetwebapi.core.models.companies.city import City
from vetwebapi.core.models.companies.street import Street
from vetwebapi.core.models.users.role import Role


async def add_start_roles(session: AsyncSession):
    """Добавляем роль пользователь и админ в базу данных"""
    roles = []
    user = Role(name="user")
    admin = Role(name="admin")
    roles.append(user)
    roles.append(admin)
    session.add_all(roles)
    await session.commit()


async def add_first_region(session: AsyncSession) -> int:
    """Добавляем Ивановскую область в базу данных"""
    first_region = Region(name="Ивановская область")
    session.add(first_region)
    await session.commit()
    await session.refresh(first_region)
    return first_region.id


async def add_districts(session: AsyncSession) -> tuple[int]:
    """Добавляем Иваново и Ивановский район в таблицу районы в базе данных"""
    region_id = await add_first_region(session=session)
    first_district = District(region_id=region_id, name="Иваново город")
    second_district = District(region_id=region_id, name="Ивановский район")
    session.add_all([first_district, second_district])
    await session.commit()
    await session.refresh(first_district)
    await session.refresh(second_district)
    return (first_district.id, second_district.id)


async def add_cities(session: AsyncSession) -> tuple[int]:
    """Добавляем город Иваново и Кохма в базу данных"""
    district_id = await add_districts(session=session)
    first_city = City(district_id=district_id[0], name="Иваново")
    second_city = City(district_id=district_id[1], name="Кохма")
    session.add_all([first_city, second_city])
    await session.commit()
    await session.refresh(first_city)
    await session.refresh(second_city)
    return (first_city.id, second_city.id)


async def fill_street_table(session: AsyncSession) -> None:
    """Заполняем таблицу с улицами"""
    city_id = await add_cities(session=session)
    streets = []
    with open("vetwebapi/streets.txt", encoding="utf16") as f:
        for street in f:
            # print(street.strip())
            streets.append(Street(city_id=city_id[0], name=street))
    streets.append(Street(city_id=city_id[1], name="улица Ивановская"))
    session.add_all(streets)
    await session.commit()


def get_full_name(lastname: str, firstname: str, patronymic: str) -> str:
    return f"{lastname.capitalize} {firstname[0].upper}. {patronymic[0].upper}."
