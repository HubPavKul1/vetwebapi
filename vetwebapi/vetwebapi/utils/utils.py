from sqlalchemy.ext.asyncio import AsyncSession
from vetwebapi.core.models.companies.region import Region
from vetwebapi.core.models.companies.district import District
from vetwebapi.core.models.companies.city import City
from vetwebapi.core.models.companies.street import Street


async def add_first_region(session: AsyncSession) -> int:
    """Добавляем Ивановскую область в базу данных"""
    first_region = Region(name="Ивановская область")
    session.add(first_region)
    await session.commit()
    await session.refresh(first_region)
    return first_region.id


async def add_first_district(session: AsyncSession) -> int:
    """Добавляем Иваново в таблицу районы в базе данных"""
    region_id = await add_first_region(session=session)
    first_district = District(region_id=region_id, name="Иваново город")
    session.add(first_district)
    await session.commit()
    await session.refresh(first_district)
    return first_district.id


async def add_first_city(session: AsyncSession) -> int:
    """Добавляем первый город в базу данных"""
    district_id = add_first_district(session=session)
    first_city = City(district_id=district_id, name="Иваново")
    session.add(first_city)
    await session.commit()
    await session.refresh(first_city)
    return first_city.id 


async def fill_street_table(session: AsyncSession) -> None:
    """Заполняем таблицу с улицами"""
    city_id = await add_first_city(session=session)
    streets = []
    with open('vetwebapi/streets.txt', encoding='utf16') as f:
        for street in f:
            # print(street.strip())
            streets.append(Street(city_id=city_id, name=street))
    session.add_all(streets)
    await session.commit()
    
    
def get_full_name(lastname: str, firstname: str, patronymic: str) -> str:
    return f"{lastname.capitalize} {firstname[0].upper}. {patronymic[0].upper}."