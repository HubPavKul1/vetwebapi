import os
import shutil

from fastapi import File, UploadFile
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from core.models import (
    AccountingUnit,
    Budget,
    Drug,
    DrugManufacturer,
    DisposalMethod,
    Dosage,
    PlaceOfAdministration,
    AdministrationMethod
)

from core.settings import settings, BASE_DIR
from utils import utils

from .schemas import DrugIn


# Create
async def create_drug(session: AsyncSession, body: DrugIn) -> Drug:
    new_drug = Drug(**body.model_dump())
    session.add(new_drug)
    await session.commit()
    await session.refresh(new_drug)
    return new_drug


# Save Files
async def save_file(session: AsyncSession, drug: Drug, file: UploadFile = File(...)) -> None:
    filename = await utils.prepare_filename(str(file.filename))

    dest = ""

    if file.content_type in ["application/pdf"]:
        drug.instruction = drug.instruction_path(filename=filename)
        dest = os.path.join(settings.media_dir, drug.instruction)

    else:
        drug.image = drug.image_path(filename=filename)
        dest = os.path.join(settings.media_dir, drug.image)

    with open(dest, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    session.add(drug)
    await session.commit()
    await session.refresh(drug)


# Read
async def read_drug_by_id(session: AsyncSession, drug_id: int) -> Drug | None:
    return await session.get(Drug, drug_id)


async def read_drugs_with_options(session: AsyncSession) -> list[Drug]:
    stmt = (
        select(Drug)
        .options(joinedload(Drug.drug_manufacturer))
        .where(Drug.is_active)
        .order_by(Drug.name)
    )
    return list(await session.scalars(stmt))


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


async def read_disposal_methods(session: AsyncSession) -> list[DisposalMethod]:
    stmt = select(DisposalMethod).order_by(DisposalMethod.name)
    return list(await session.scalars(stmt))


async def read_dosages(session: AsyncSession) -> list[Dosage]:
    stmt = select(Dosage).order_by(Dosage.name)
    return list(await session.scalars(stmt))


async def read_places_of_administration(session: AsyncSession) -> list[PlaceOfAdministration]:
    stmt = select(PlaceOfAdministration).order_by(PlaceOfAdministration.name)
    return list(await session.scalars(stmt))


async def read_administration_methods(session: AsyncSession) -> list[AdministrationMethod]:
    stmt = select(AdministrationMethod).order_by(AdministrationMethod.name)
    return list(await session.scalars(stmt))

# Delete
async def remove_drug_image(filepath: str) -> None:
    image_to_remove = os.path.join(settings.media_dir, filepath)
    os.remove(image_to_remove)


async def remove_drug_instruction(filepath: str) -> None:
    file_to_remove = os.path.join(settings.media_dir, filepath)
    os.remove(file_to_remove)


async def delete_drug(session: AsyncSession, drug: Drug) -> None:
    if drug.image is not None:
        await remove_drug_image(filepath=drug.image)
    if drug.instruction is not None:
        await remove_drug_instruction(filepath=drug.instruction)
    await session.delete(drug)
    await session.commit()
