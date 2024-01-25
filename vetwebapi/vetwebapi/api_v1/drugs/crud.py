from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import Drug, DrugMovement, DrugInMovement, Operation
from .schemas import DrugInMovementIn, DrugMovementIn, DrugIn

# Create
async def create_drug_movement(session: AsyncSession, body: DrugMovementIn, operation_id: int) -> DrugMovement:
    new_drug_movement = DrugMovement(**body.model_dump())
    new_drug_movement.operation_id = operation_id
    session.add(new_drug_movement)
    await session.commit()
    await session.refresh(new_drug_movement)
    return new_drug_movement

async def create_drug(session: AsyncSession, body: DrugIn) -> Drug:
    new_drug = Drug(**body.model_dump())
    session.add(new_drug)
    await session.commit()
    await session.refresh(new_drug)
    return new_drug

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