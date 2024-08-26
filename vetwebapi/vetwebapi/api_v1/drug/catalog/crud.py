from datetime import datetime
from sqlalchemy import desc, select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from core.models import CatalogDrug, Drug

from .schemas import CatalogDrugIn


async def create_catalog_drug(session: AsyncSession, body: CatalogDrugIn) -> CatalogDrug:
    new_item = CatalogDrug(**body.model_dump())
    session.add(new_item)
    await session.commit()
    await session.refresh(new_item)
    return new_item


async def read_catalog(session: AsyncSession) -> list[CatalogDrug]:
    stmt = (
        select(CatalogDrug)
        .options(joinedload(CatalogDrug.drug))
        .where(CatalogDrug.is_active == True)
    )
    return list(await session.scalars(stmt))


async def read_catalog_expired(session: AsyncSession) -> list[CatalogDrug]:
    curDate = datetime.today().date()
    stmt = select(CatalogDrug).where(
        and_(CatalogDrug.is_active == True, CatalogDrug.expiration_date < curDate)
    )
    return list(await session.scalars(stmt))


async def change_drug_activity(session: AsyncSession) -> None:
    drugs_expired: list[CatalogDrug] = await read_catalog_expired(session=session)
    for drug in drugs_expired:
        drug.is_active = False
        session.add(drug)
        await session.commit()


async def read_catalog_drug_by_id(session: AsyncSession, id: int) -> CatalogDrug | None:
    return await session.get(CatalogDrug, id)


async def delete_catalog_drug(session: AsyncSession, drug: CatalogDrug) -> None:
    await session.delete(drug)
    await session.commit()
