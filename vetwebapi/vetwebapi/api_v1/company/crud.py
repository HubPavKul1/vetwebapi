from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from vetwebapi.core.models import Company, Address, Region, District, City, Street

from .schemas import CompanyIn, AddressSchema


async def create_company(session: AsyncSession, body: CompanyIn) -> Company:
    new_company = Company(full_name=body.full_name, short_name=body.short_name)
    session.add(new_company)
    await session.commit()
    await session.refresh(new_company)
    return new_company


async def create_address(session: AsyncSession, body: AddressSchema, company: Company) -> None:
    street = body.street.name
    street_obj = await read_street_by_name(session=session, street_name=street)
    city = body.street.city.name
    city_obj = await read_city_by_name(session=session, city_name=city)
    district = body.street.city.district.name
    district_obj = await read_district_by_name(session=session, district_name=district)
    region = body.street.city.district.region.name
    region_obj = await read_region_by_name(session=session, region_name=region)

    print(region_obj, district_obj, city_obj, street_obj)


async def read_companies(session: AsyncSession) -> list[Company]:
    stmt = select(Company)
    return list(await session.scalars(stmt))


async def delete_company(session: AsyncSession, company: Company) -> None:
    await session.delete(company)
    await session.commit()


async def read_company_by_id(session: AsyncSession, company_id: int) -> Company | None:
    return await session.get(Company, company_id)


async def read_address(session: AsyncSession, company: Company) -> Address | None:
    stmt = select(Address).where(Address.company_id == company.id)
    address = await session.scalar(stmt)
    print(address)
    return address


async def read_region_by_name(session: AsyncSession, region_name: str) -> Region | None:
    stmt = select(Region).where(Region.name.ilike(region_name))
    return await session.scalar(stmt)


async def read_district_by_name(session: AsyncSession, district_name: str) -> District | None:
    stmt = select(District).where(District.name.ilike(district_name))
    return await session.scalar(stmt)


async def read_city_by_name(session: AsyncSession, city_name: str) -> City | None:
    stmt = select(City).where(City.name.ilike(city_name))
    return await session.scalar(stmt)


async def read_street_by_name(session: AsyncSession, street_name: str) -> Street| None:
    stmt = select(Street).where(Street.name.ilike(street_name))
    return await session.scalar(stmt)
