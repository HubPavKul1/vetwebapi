from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from core.models import (
    CatalogDrug,
    Drug,
    DrugDisease,
    DrugInMovement,
    DrugMovement,
    Operation,
)

from .schemas import DrugInMovementIn, DrugMovementIn


# Create
async def create_receipt(session: AsyncSession, body: DrugMovementIn) -> DrugMovement:
    new_drug_movement = DrugMovement(**body.model_dump())
    new_drug_movement.operation_id = 1
    session.add(new_drug_movement)
    await session.commit()
    await session.refresh(new_drug_movement)
    return new_drug_movement


async def add_drug_to_movement(
    session: AsyncSession, body: DrugInMovementIn, drug_movement_id: int
) -> DrugInMovement:
    new_drug = DrugInMovement(**body.model_dump())
    new_drug.drug_movement_id = drug_movement_id
    session.add(new_drug)
    await session.commit()
    return new_drug


# Read
async def read_operation_by_id(
    session: AsyncSession, operation_id: int
) -> Operation | None:
    return await session.get(Operation, operation_id)


async def read_drug_movement_by_id(
    session: AsyncSession, drug_movement_id: int
) -> DrugMovement | None:
    return await session.get(DrugMovement, drug_movement_id)


async def read_receipts(session: AsyncSession) -> list[DrugMovement]:
    stmt = (
        select(DrugMovement)
        .where(DrugMovement.operation_id == 1)
        .order_by(desc(DrugMovement.operation_date))
    )
    return list(await session.scalars(stmt))


async def read_receipts_with_drugs(session: AsyncSession) -> list[DrugMovement]:
    stmt = (
        select(DrugMovement)
        .options(
            selectinload(DrugMovement.catalog_drugs_details)
            .joinedload(DrugInMovement.catalog_drug)
            .joinedload(CatalogDrug.drug)
            .selectinload(Drug.diseases_details)
            .joinedload(DrugDisease.disease)
        )
        .where(DrugMovement.operation_id == 1)
        .order_by(desc(DrugMovement.operation_date))
    )

    return list(await session.scalars(stmt))


async def read_drugs_in_drug_movement(
    session: AsyncSession, drug_movement: DrugInMovement
) -> list[DrugInMovement]:
    stmt = (
        select(DrugInMovement)
        .options(
            joinedload(DrugInMovement.catalog_drug)
            .joinedload(CatalogDrug.drug)
            .selectinload(Drug.diseases_details)
            .joinedload(DrugDisease.disease)
        )
        .where(DrugInMovement.drug_movement_id == drug_movement.id)
    )

    return list(await session.scalars(stmt))


async def read_drugs_in_drug_movement_relation(
    session: AsyncSession, drug_movement: DrugInMovement
) -> list[DrugInMovement]:
    stmt = select(DrugInMovement).where(
        DrugInMovement.drug_movement_id == drug_movement.id
    )

    return list(await session.scalars(stmt))


# Delete
async def delete_drug_movement(
    session: AsyncSession, drug_movement: DrugMovement
) -> None:
    drugs_in_movement = await read_drugs_in_drug_movement_relation(
        session=session, drug_movement=drug_movement
    )

    [await session.delete(drug) for drug in drugs_in_movement]
    await session.delete(drug_movement)
    await session.commit()
