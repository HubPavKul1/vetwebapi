from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import Company, Role

from .schemas import CompanyIn

# Create Data
async def create_company(session: AsyncSession, body: CompanyIn) -> Company:
    new_company = Company(**body.model_dump())
    new_company.full_name = new_company.full_name.capitalize()
    new_company.short_name = new_company.short_name.capitalize()
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
    stmt = select(Company).where(Company.is_active == True).order_by(Company.short_name)
    return list(await session.scalars(stmt))


async def read_company_by_id(session: AsyncSession, company_id: int) -> Company | None:
    return await session.get(Company, company_id)


# Update Data

# Delete Data    
async def delete_company(session: AsyncSession, company: Company) -> None:
    await session.delete(company)
    await session.commit()

