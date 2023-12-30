from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from vetwebapi.core.models import Company, Address

from .schemas import CompanyIn, AddressSchema


async def create_company(session: AsyncSession, body: CompanyIn) -> Company:
    new_company = Company(full_name=body.full_name, short_name=body.short_name)
    session.add(new_company)
    await session.commit()
    await session.refresh(new_company)
    return new_company


async def create_address(session: AsyncSession, body: AddressSchema, company: Company) -> None:

    pass


async def read_companies(session: AsyncSession) -> list[Company]:
    stmt = select(Company)
    return list(await session.scalars(stmt))


async def delete_company(session: AsyncSession, company: Company) -> None:
    await session.delete(company)
    await session.commit()


async def read_company_by_id(session: AsyncSession, company_id: int) -> Company:
    return await session.get(Company, company_id)


async def read_address(session: AsyncSession, company: Company) -> Address:
    pass

