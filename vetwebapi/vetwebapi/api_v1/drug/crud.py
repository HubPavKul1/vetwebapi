import os
import shutil

from fastapi import File, UploadFile
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from core.models import (
    AccountingUnit,
    AdministrationMethod,
    Budget,
    DisposalMethod,
    Dosage,
    Drug,
    DrugDisease,
    DrugManufacturer,
    PlaceOfAdministration,
)
from core.settings import BASE_DIR, settings
from utils import utils

from .schemas import DrugIn


# Create
async def create_drug(session: AsyncSession, body: DrugIn) -> Drug:
    diseases = body.diseases
    new_drug = Drug(**body.model_dump(exclude={"diseases"}))
    session.add(new_drug)
    await session.commit()
    await session.refresh(new_drug)

    await add_diseases_to_drug(session=session, drug_id=new_drug.id, diseases=diseases)
    return new_drug


async def add_diseases_to_drug(session: AsyncSession, drug_id: int, diseases: list[int]) -> None:
    new_relations = [DrugDisease(drug_id=drug_id, disease_id=item) for item in diseases]
    session.add_all(new_relations)
    await session.commit()


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
    stmt = (
        select(Drug)
        .options(selectinload(Drug.diseases_details).joinedload(DrugDisease.disease))
        .where(Drug.id == drug_id)
    )
    return await session.scalar(stmt)


async def read_drugs_with_options(session: AsyncSession) -> list[Drug]:
    stmt = (
        select(Drug)
        .options(joinedload(Drug.drug_manufacturer))
        .options(selectinload(Drug.diseases_details).joinedload(DrugDisease.disease))
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
