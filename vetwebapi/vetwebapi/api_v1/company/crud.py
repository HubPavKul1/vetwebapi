from sqlalchemy import select
from operator import and_

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload, with_polymorphic

from core.models import Company, Role, Clinic, Laboratory

from .schemas import CompanyIn


# Create Data
async def create_company(session: AsyncSession, body: CompanyIn) -> Company:
    new_company = Company(**body.model_dump())
    session.add(new_company)
    await session.commit()
    await session.refresh(new_company)
    return new_company


async def create_test_companies(session: AsyncSession) -> None:
    companies: list[Company] = [
        Company(full_name=f"company{i}", short_name=f"comp{i}") for i in range(30)
    ]
    session.add_all(companies)
    await session.commit()


async def create_clinic(session: AsyncSession, body: CompanyIn) -> Clinic:
    clinic = Clinic(**body.model_dump())
    session.add(clinic)
    await session.commit()
    await session.refresh(clinic)
    return clinic


async def create_lab(session: AsyncSession, body: CompanyIn) -> Laboratory:
    new_lab = Laboratory(**body.model_dump())
    session.add(new_lab)
    await session.commit()
    await session.refresh(new_lab)
    return new_lab


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
        .where(and_(Company.is_active, Company.type == "company"))
        .order_by(Company.short_name)
    )
    return list(await session.scalars(stmt))


async def read_clinics_with_options(session: AsyncSession) -> list[Clinic]:
    stmt = (
        select(Clinic)
        .options(selectinload(Company.employees))
        .options(joinedload(Company.addresses))
        .where(Company.is_active)
        .order_by(Company.short_name)
    )
    return list(await session.scalars(stmt))


async def read_labs_with_options(session: AsyncSession) -> list[Laboratory]:

    stmt = (
        select(Laboratory)
        .options(selectinload(Company.employees))
        .options(joinedload(Company.addresses))
        .where(Company.is_active)
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
