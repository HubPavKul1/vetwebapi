import os
import shutil
from operator import and_
from typing import Iterable

from fastapi import File, UploadFile
from sqlalchemy import ScalarResult, desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from api_v1.drug.receipts.schemas import DrugInMovementIn
from core.models import (
    AnimalInVetWork,
    Biomaterial,
    BiomaterialFixation,
    BiomaterialPackage,
    CatalogDrug,
    CompanyInVetWork,
    DiagnosticMethod,
    Disease,
    DiseaseInVetWork,
    DoctorInVetWork,
    Drug,
    DrugDisease,
    DrugInMovement,
    DrugMovement,
    VetWork,
    VetWorkFile,
)
from core.settings import settings
from utils import utils

from .schemas import (
    AnimalInVetWorkIn,
    AnimalInVetWorkUpdatePartial,
    CompanyInVetWorkIn,
    DiagnosticIn,
    VaccinationIn,
)


# Create
async def create_disease(session: AsyncSession, name: str) -> None:
    new_disease = Disease(name=name)
    session.add(new_disease)
    await session.commit()


async def save_file(
    session: AsyncSession, vetwork: VetWork, file: UploadFile = File(...)
) -> int:
    has_vetwork_file = await read_vetwork_file(session=session, vetwork=vetwork)
    if has_vetwork_file:
        return 0

    filename = await utils.prepare_filename(str(file.filename))

    vetwork_file = VetWorkFile()
    vetwork_file.vetwork_id = vetwork.id
    vetwork_file.file_path = vetwork_file.create_file_path(filename=filename)

    dest = os.path.join(settings.media_dir, vetwork_file.file_path)

    with open(dest, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    session.add(vetwork_file)
    await session.commit()
    await session.refresh(vetwork_file)
    return vetwork_file.id


async def create_vetwork(session: AsyncSession, body: VaccinationIn) -> VetWork:
    diseases = body.diseases
    doctors = body.doctors
    new_vetwork = VetWork(**body.model_dump(exclude={"diseases", "doctors"}))
    session.add(new_vetwork)
    await session.commit()
    await session.refresh(new_vetwork)

    await add_diseases_in_vetwork(
        session=session, vetwork_id=new_vetwork.id, diseases=diseases
    )
    await add_doctors_in_vetwork(
        session=session, vetwork_id=new_vetwork.id, doctors=doctors
    )
    return new_vetwork


async def create_diagnostic(session: AsyncSession, body: DiagnosticIn) -> VetWork:
    diseases = body.diseases
    doctors = body.doctors
    new_vetwork = VetWork(**body.model_dump(exclude={"diseases", "doctors"}))
    session.add(new_vetwork)
    await session.commit()
    await session.refresh(new_vetwork)

    await add_diseases_in_vetwork(
        session=session, vetwork_id=new_vetwork.id, diseases=diseases
    )
    await add_doctors_in_vetwork(
        session=session, vetwork_id=new_vetwork.id, doctors=doctors
    )
    return new_vetwork


async def add_diseases_in_vetwork(
    session: AsyncSession, vetwork_id: int, diseases: list[int]
) -> None:
    new_relations = [
        DiseaseInVetWork(vetwork_id=vetwork_id, disease_id=item) for item in diseases
    ]
    session.add_all(new_relations)
    await session.commit()


async def add_doctors_in_vetwork(
    session: AsyncSession, vetwork_id: int, doctors: list[int]
) -> None:
    new_relations = [
        DoctorInVetWork(vetwork_id=vetwork_id, employee_id=item) for item in doctors
    ]
    session.add_all(new_relations)
    await session.commit()


async def add_company_to_vetwork(
    session: AsyncSession, vetwork: VetWork, body: CompanyInVetWorkIn
) -> None:
    new_relation = CompanyInVetWork(vetwork_id=vetwork.id, company_id=body.company_id)
    session.add(new_relation)
    await session.commit()


async def add_animals_to_vetwork(
    session: AsyncSession, vetwork: VetWork, body: list[AnimalInVetWorkIn]
) -> None:
    new_relations = [
        AnimalInVetWork(**item.model_dump(), vetwork_id=vetwork.id) for item in body
    ]

    session.add_all(new_relations)
    await session.commit()


async def add_drug_to_vetwork(
    session: AsyncSession, vetwork: VetWork, body: DrugInMovementIn
) -> None:
    new_drug_movement = DrugMovement(
        operation_id=2, operation_date=vetwork.vetwork_date
    )
    session.add(new_drug_movement)
    await session.commit()
    await session.refresh(new_drug_movement)
    new_drug = DrugInMovement(**body.model_dump())
    new_drug.drug_movement_id = new_drug_movement.id
    session.add(new_drug)
    vetwork.drug_movement_id = new_drug_movement.id
    session.add(vetwork)
    await session.commit()


# Read
async def read_diseases(session: AsyncSession) -> list[Disease]:
    stmt = select(Disease).order_by(Disease.name)
    return list(await session.scalars(stmt))


async def read_vetwork_file(
    session: AsyncSession, vetwork: VetWork
) -> VetWorkFile | None:
    stmt = select(VetWorkFile).where(VetWorkFile.vetwork_id == vetwork.id)
    return await session.scalar(stmt)


async def read_vaccinations(session: AsyncSession) -> list[VetWork]:
    stmt = (
        select(VetWork)
        .options(
            selectinload(VetWork.diseases_details).joinedload(DiseaseInVetWork.disease)
        )
        .where(VetWork.work_type_id == 1)
        .order_by(desc(VetWork.vetwork_date))
    )
    return list(await session.scalars(stmt))


async def read_diagnostics(session: AsyncSession) -> list[VetWork]:
    stmt = (
        select(VetWork)
        .options(
            selectinload(VetWork.diseases_details).joinedload(DiseaseInVetWork.disease)
        )
        .where(VetWork.work_type_id == 2)
        .order_by(desc(VetWork.vetwork_date))
    )
    return list(await session.scalars(stmt))


async def read_vetwork_by_id(session: AsyncSession, vetwork_id: int) -> VetWork | None:
    stmt = (
        select(VetWork)
        .options(
            selectinload(VetWork.diseases_details).joinedload(DiseaseInVetWork.disease)
        )
        .where(VetWork.id == vetwork_id)
    )
    return await session.scalar(stmt)


async def read_animals_in_vetwork(
    session: AsyncSession, vetwork: VetWork
) -> list[AnimalInVetWork]:
    stmt = (
        select(AnimalInVetWork)
        .options(joinedload(AnimalInVetWork.animal))
        .where(AnimalInVetWork.vetwork_id == vetwork.id)
    )
    return list(await session.scalars(stmt))


async def read_animal_in_vetwork_by_id(
    session: AsyncSession, vetwork: VetWork, animal_id: int
) -> AnimalInVetWork | None:
    stmt = select(AnimalInVetWork).where(
        and_(
            AnimalInVetWork.vetwork_id == vetwork.id,
            AnimalInVetWork.animal_id == animal_id,
        )
    )
    return await session.scalar(stmt)


async def read_companies_in_vetwork(
    session: AsyncSession, vetwork: VetWork
) -> list[CompanyInVetWork]:
    stmt = (
        select(CompanyInVetWork)
        .options(joinedload(CompanyInVetWork.company))
        .where(CompanyInVetWork.vetwork_id == vetwork.id)
    )
    return list(await session.scalars(stmt))


async def read_company_in_vetwork_by_id(
    session: AsyncSession, vetwork: VetWork, company_id: int
) -> CompanyInVetWork | None:
    stmt = select(CompanyInVetWork).where(
        and_(
            CompanyInVetWork.company_id == company_id,
            CompanyInVetWork.vetwork_id == vetwork.id,
        )
    )
    return await session.scalar(stmt)


async def read_doctors_in_vetwork(
    session: AsyncSession, vetwork: VetWork
) -> list[DoctorInVetWork]:
    stmt = (
        select(DoctorInVetWork)
        .options(joinedload(DoctorInVetWork.doctor))
        .where(DoctorInVetWork.vetwork_id == vetwork.id)
    )
    return list(await session.scalars(stmt))


async def read_drug_in_vetwork(
    session: AsyncSession, vetwork: VetWork
) -> DrugInMovement:
    stmt = (
        select(DrugInMovement)
        .options(
            joinedload(DrugInMovement.catalog_drug)
            .joinedload(CatalogDrug.drug)
            .selectinload(Drug.diseases_details)
            .joinedload(DrugDisease.disease)
        )
        .where(DrugInMovement.drug_movement_id == vetwork.drug_movement_id)
    )
    return await session.scalar(stmt)


async def read_biomaterial_fixations(
    session: AsyncSession,
) -> list[BiomaterialFixation]:
    stmt = select(BiomaterialFixation).order_by(BiomaterialFixation.name)
    return list(await session.scalars(stmt))


async def read_biomaterials(session: AsyncSession) -> list[Biomaterial]:
    stmt = select(Biomaterial).order_by(Biomaterial.name)
    return list(await session.scalars(stmt))


async def read_biomaterial_packages(session: AsyncSession) -> list[BiomaterialPackage]:
    stmt = select(BiomaterialPackage).order_by(BiomaterialPackage.name)
    return list(await session.scalars(stmt))


async def read_diagnosic_methods(session: AsyncSession) -> list[DiagnosticMethod]:
    stmt = select(DiagnosticMethod).order_by(DiagnosticMethod.name)
    return list(await session.scalars(stmt))


# UPDATE


async def update_animal_in_vetwork(
    session: AsyncSession,
    animal: AnimalInVetWork,
    animal_update: AnimalInVetWorkUpdatePartial,
    partial: bool = False,
) -> AnimalInVetWork:
    for name, value in animal_update.model_dump(exclude_unset=partial).items():
        setattr(animal, name, value)
    await session.commit()
    return animal


# DELETE


async def remove_vetwork_file(session: AsyncSession, vetwork: VetWork) -> None:
    vetworkFile: VetWorkFile | None = await read_vetwork_file(
        session=session, vetwork=vetwork
    )
    if vetworkFile is not None:
        file_path = os.path.join(settings.media_dir, vetworkFile.file_path)
        os.remove(file_path)
        await delete_item_in_vetwork(session=session, item=vetworkFile)


async def delete_vetwork_animals(session: AsyncSession, vetwork: VetWork) -> None:
    stmt = select(AnimalInVetWork).where(AnimalInVetWork.vetwork_id == vetwork.id)
    animals: ScalarResult[AnimalInVetWork] = await session.scalars(stmt)
    if len(list(animals)) > 1:
        [
            await delete_item_in_vetwork(session=session, item=animal)
            for animal in animals
        ]
    elif len(list(animals)) == 1:
        await delete_item_in_vetwork(session=session, item=animals.first())


async def delete_vetwork_companies(session: AsyncSession, vetwork: VetWork) -> None:
    stmt = select(CompanyInVetWork).where(CompanyInVetWork.vetwork_id == vetwork.id)
    companies: list[CompanyInVetWorkIn] = list(await session.scalars(stmt))
    if len(companies) > 1:
        [
            await delete_item_in_vetwork(session=session, item=company)
            for company in companies
        ]
    elif len(companies) == 1:
        await delete_item_in_vetwork(session=session, item=companies[0])


async def delete_vetwork_diseases(session: AsyncSession, vetwork: VetWork) -> None:
    stmt = select(DiseaseInVetWork).where(DiseaseInVetWork.vetwork_id == vetwork.id)
    diseases: list[DiseaseInVetWork] = list(await session.scalars(stmt))
    if len(diseases) > 1:
        [
            await delete_item_in_vetwork(session=session, item=disease)
            for disease in diseases
        ]
    elif len(diseases) == 1:
        await delete_item_in_vetwork(session=session, item=diseases[0])


async def delete_vetwork_doctors(session: AsyncSession, vetwork: VetWork) -> None:
    stmt = select(DoctorInVetWork).where(DoctorInVetWork.vetwork_id == vetwork.id)
    doctors: list[DoctorInVetWork] = list(await session.scalars(stmt))
    if len(doctors) > 1:
        [
            await delete_item_in_vetwork(session=session, item=doctor)
            for doctor in doctors
        ]
    elif len(doctors) == 1:
        await delete_item_in_vetwork(session=session, item=doctors[0])


async def delete_vetwork(session: AsyncSession, vetwork: VetWork) -> None:
    await remove_vetwork_file(session=session, vetwork=vetwork)
    await delete_vetwork_animals(session=session, vetwork=vetwork)
    await delete_vetwork_companies(session=session, vetwork=vetwork)
    await delete_vetwork_diseases(session=session, vetwork=vetwork)
    await delete_vetwork_doctors(session=session, vetwork=vetwork)
    await session.delete(vetwork)
    await session.commit()


async def delete_item_in_vetwork(
    session: AsyncSession,
    item: (
        CompanyInVetWork
        | AnimalInVetWork
        | DiseaseInVetWork
        | DoctorInVetWork
        | VetWorkFile
    ),
) -> None:
    await session.delete(item)
    await session.commit()
