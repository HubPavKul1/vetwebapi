from sqlalchemy import select
from operator import and_

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from vetwebapi.core.models import Company, Role

from .schemas import CompanyIn


# Create Data
async def create_company(session: AsyncSession, body: CompanyIn) -> Company:
    new_company = Company(**body.model_dump())
    new_company.full_name = new_company.full_name.upper()
    new_company.short_name = new_company.short_name.upper()
    session.add(new_company)
    await session.commit()
    await session.refresh(new_company)
    return new_company


async def create_role(session: AsyncSession, name: str) -> None:
    new_role = Role(name=name)
    session.add(new_role)
    await session.commit()


# Read Data
async def read_companies(session: AsyncSession) -> list[Company]:
    stmt = select(Company).where(Company.is_active).order_by(Company.short_name)
    return list(await session.scalars(stmt))


async def read_companies_with_options(session: AsyncSession) -> list[Company]:
    stmt = (
        select(Company)
        .options(selectinload(Company.employees))
        .options(joinedload(Company.addresses))
        .where(and_(Company.is_active, Company.is_vet == False))
        .order_by(Company.short_name)
    )
    return list(await session.scalars(stmt))


async def read_vet_clinics_with_options(session: AsyncSession) -> list[Company]:
    stmt = (
        select(Company)
        .options(selectinload(Company.employees))
        .options(joinedload(Company.addresses))
        .where(and_(Company.is_active, Company.is_vet))
        .order_by(Company.short_name)
    )
    return list(await session.scalars(stmt))


async def read_company_by_id(session: AsyncSession, company_id: int) -> Company | None:
    return await session.get(Company, company_id)


async def is_company_exists(session: AsyncSession, short_name: str) -> bool:
    stmt = select(Company).where(Company.short_name.ilike(short_name))
    return bool(await session.scalar(stmt))


# Update Data


# Delete Data
async def delete_company(session: AsyncSession, company: Company) -> None:
    await session.delete(company)
    await session.commit()
