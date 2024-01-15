from operator import and_
from typing import TYPE_CHECKING
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import Address, Region, District, City, Street

from .schemas import AddressIn


# Create Address
async def create_address(session: AsyncSession, body: AddressIn, company_id: int) -> None:
    new_address = Address(**body.model_dump())
    new_address.company_id = company_id
    session.add(new_address)
    await session.commit()
    
    
async def create_region(session: AsyncSession, name: str) -> int:
    new_region = Region(name=name.capitalize())
    session.add(new_region)
    await session.commit()
    await session.refresh(new_region)
    return new_region.id

    
async def create_district(session: AsyncSession, name: str, region_id: int) -> int:
    new_district = District(region_id=region_id, name=name.capitalize())
    session.add(new_district)
    await session.commit()
    await session.refresh(new_district)
    return new_district.id

async def create_city(session: AsyncSession, name: str, district_id: int) -> int:
    new_city = City(district_id=district_id, name=name.capitalize())
    session.add(new_city)
    await session.commit()
    await session.refresh(new_city)
    return new_city.id

async def create_street(session: AsyncSession, name: str, city_id: int) -> None:
    new_street = Street(city_id=city_id, name=name)
    session.add(new_street)
    await session.commit()
    

# Read Address

async def read_company_address(session: AsyncSession, company_id:int) -> Address | None:
    stmt = select(Address).where(Address.company_id == company_id)
    address = await session.scalar(stmt)
    return address


async def read_address_by_id(session: AsyncSession, address_id: int) -> Address | None:
    return await session.get(Address, address_id)


async def read_street_by_id(session: AsyncSession, street_id: int) -> Street | None:
    return await session.get(Street, street_id)


async def read_regions(session: AsyncSession) -> list[Region]:
    stmt = select(Region)
    return list(await session.scalars(stmt))


async def read_districts(session: AsyncSession) -> list[District]:
    stmt = select(District).order_by(District.name)
    return list(await session.scalars(stmt))


async def read_cities(session: AsyncSession) -> list[City]:
    stmt = select(City).order_by(City.name)
    return list(await session.scalars(stmt))


async def read_streets(session: AsyncSession) -> list[Street]:
    stmt = select(Street).order_by(Street.name)
    return list(await session.scalars(stmt))

# Delete

async def delete_address(session: AsyncSession, address: Address) -> None:
    await session.delete(address)
    await session.commit()
