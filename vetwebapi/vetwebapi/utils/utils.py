from sqlalchemy.ext.asyncio import AsyncSession
from vetwebapi.core.models.companies.city import City
from vetwebapi.core.models.companies.street import Street


async def add_first_city(session: AsyncSession) -> int:
    """Добавляем первый город в базу данных"""
    first_city = City(name="Иваново")
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