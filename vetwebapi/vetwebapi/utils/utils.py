from sqlalchemy.ext.asyncio import AsyncSession
from vetwebapi.api_v1.company import crud


async def add_districts(session: AsyncSession) -> list[int]:
    """Добавляем Иваново и Ивановский район в таблицу районы в базе данных"""
    region_id: int = await crud.create_region(session=session, name="Ивановская область")
    names = ["Иваново город", "Ивановский район"]
    return [await crud.create_district(session=session, region_id=region_id, name=name) for name in names]
    
    
async def add_cities(session: AsyncSession) -> tuple[int]:
    """Добавляем город Иваново и Кохма в базу данных"""
    districts_ids: list[int] = await add_districts(session=session)
    names = ["Иваново", "Кохма"]
    city1_id = await crud.create_city(session=session, district_id=districts_ids[0], name=names[0])
    city2_id = await crud.create_city(session=session, district_id=districts_ids[1], name=names[1])
    return (city1_id, city2_id)


async def fill_street_table(session: AsyncSession) -> None:
    """Заполняем таблицу с улицами"""
    city_ids: tuple[int] = await add_cities(session=session)
    await crud.create_street(session=session, city_id=city_ids[1], name="улица Ивановская")
    with open("vetwebapi/streets.txt", encoding="utf16") as f:
        for street in f:
            await crud.create_street(session=session, city_id=city_ids[0], name=street)
            
            
async def add_roles(session: AsyncSession) -> None:
    """Добавляем роли пользователей в базу данных"""
    names = ["admin", "user"]
    [await crud.create_role(session=session, name=name) for name in names]
    
    
async def add_positions(session: AsyncSession) -> None:
    """Добавляем должности работников в базу данных"""
    names = ["ветврач", "ИП", "гр"]
    [await crud.create_position(session=session, name=name) for name in names]
    

async def prepare_db(session: AsyncSession) -> None:
    """Подготовка базы данных при первом запуске"""
    await fill_street_table(session=session)
    await add_roles(session=session)
    await add_positions(session=session)
