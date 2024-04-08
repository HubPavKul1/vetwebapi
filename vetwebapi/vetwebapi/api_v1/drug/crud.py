import os
import shutil

from pathlib import Path


from vetwebapi.utils import utils
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import File, UploadFile

from vetwebapi.core.settings import BASE_DIR

from vetwebapi.core.models import Drug, DrugMovement, DrugInMovement, Operation, DrugManufacturer, AccountingUnit, Budget
from .schemas import DrugInMovementIn, DrugMovementIn, DrugIn


# Create
async def create_receipt(session: AsyncSession, body: DrugMovementIn) -> DrugMovement:
    new_drug_movement = DrugMovement(**body.model_dump())
    new_drug_movement.operation_id = 1
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


# Save Files

async def save_file(session: AsyncSession, drug_id: int, file: UploadFile = File(...)) -> None:
   
    filename = await utils.prepare_filename(str(file.filename))
    drug = await read_drug_by_id(drug_id=drug_id, session=session)

    # curdir = os.getcwd()
    insructions_dir = os.path.join(BASE_DIR, "vetwebfrontts", "public", "instructions")
    if not os.path.exists(insructions_dir):
        os.makedirs(insructions_dir)
    images_dir = os.path.join(BASE_DIR, "vetwebfrontts", "public", "images")
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)


    dest = ""

    if file.content_type in [ 
        "text/plain", 
        "application/pdf", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]:     
        dest = os.path.join(insructions_dir, filename)
        drug.instruction = dest
  
    else:
        dest = os.path.join(images_dir, filename)
        drug.image = dest

    with open(dest, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

        
    session.add(drug)
    await session.commit()
    await session.refresh(drug)


# Read
async def read_operation_by_id(session: AsyncSession, operation_id: int) -> Operation | None:
    return await session.get(Operation, operation_id)

async def read_drug_movement_by_id(session: AsyncSession, drug_movement_id: int) -> DrugMovement | None:
    return await session.get(DrugMovement, drug_movement_id)

async def read_receipts(session: AsyncSession) -> list[DrugMovement]:
    stmt = select(DrugMovement).where(DrugMovement.operation_id == 1).order_by(desc(DrugMovement.operation_date))
    return list(await session.scalars(stmt))

async def read_drug_by_id(session: AsyncSession, drug_id: int) -> Drug | None:
    return await session.get(Drug, drug_id)

async def read_drugs(session: AsyncSession) -> list[Drug]:
    stmt = select(Drug).where(Drug.is_active).order_by(Drug.name)
    return list(await session.scalars(stmt))

async def read_drug_manufacturers(session: AsyncSession) -> list[DrugManufacturer]:
    stmt = select(DrugManufacturer).order_by(DrugManufacturer.name)
    return list(await session.scalars(stmt))

async def read_accounting_units(session: AsyncSession) -> list[AccountingUnit]:
    stmt = select(AccountingUnit).order_by(AccountingUnit.name)
    return list(await session.scalars(stmt))

async def read_budgets(session: AsyncSession) -> list[Budget]:
    stmt = select(Budget).order_by(Budget.name)
    return list(await session.scalars(stmt))





# Delete

async def delete_drug(session: AsyncSession, drug: Drug) -> None:
    await session.delete(drug)
    await session.commit()