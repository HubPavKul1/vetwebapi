from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from vetwebapi.core.models import Company

from .schemas import CompanyIn


async def create_company(session: AsyncSession, body: CompanyIn) -> Company:
    new_company = Company(full_name=body.full_name, short_name=body.short_name)
    session.add(new_company)
    await session.commit()
    await session.refresh(new_company)
    return new_company


async def read_companies(session: AsyncSession) -> list[Company]:
    stmt = select(Company)
    return list(await session.scalars(stmt))


async def delete_company(session: AsyncSession, company: Company) -> None:
    await session.delete(company)
    await session.commit()
