from sqlalchemy import select, desc
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import DrugMovement, DrugInMovement, Operation
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
    session: AsyncSession, 
    body: DrugInMovementIn, 
    drug_movement: DrugMovement
    ) -> None:
    pass



# Read
async def read_operation_by_id(session: AsyncSession, operation_id: int) -> Operation | None:
    return await session.get(Operation, operation_id)

async def read_drug_movement_by_id(session: AsyncSession, drug_movement_id: int) -> DrugMovement | None:
    return await session.get(DrugMovement, drug_movement_id)

async def read_receipts(session: AsyncSession) -> list[DrugMovement]:
    stmt = select(DrugMovement).where(DrugMovement.operation_id == 1).order_by(desc(DrugMovement.operation_date))
    return list(await session.scalars(stmt))



# Delete


# async def delete_catalog_drug(session: AsyncSession, drug: CatalogDrug) -> None:
#     await session.delete(drug)
#     await session.commit()