import csv
from io import StringIO
from operator import and_

from fastapi import File, UploadFile
from sqlalchemy import select, desc
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import (
    Disease, 
    VetWork, 
    DiseaseInVetWork, 
    DoctorInVetWork,
    AnimalInVetWork,
    DrugInMovement,
    DrugMovement,
    CompanyInVetWork,
    Biomaterial,
    BiomaterialFixation,
    BiomaterialPackage,
    DiagnosticMethod
    )

from vetwebapi.api_v1.drug.receipts.schemas import DrugInMovementIn
from .schemas import VaccinationIn, AnimalInVetWorkIn, CompanyInVetWorkIn, DiagnosticIn


# Create
async def create_disease(session: AsyncSession, name: str) -> None:
    new_disease = Disease(name=name)
    session.add(new_disease)
    await session.commit()
    
    
async def create_vetwork(session: AsyncSession, body: VaccinationIn) -> VetWork: 
    diseases = body.diseases
    doctors = body.doctors
    new_vetwork = VetWork(**body.model_dump(exclude={"diseases", "doctors"}))
    session.add(new_vetwork)
    await session.commit()
    await session.refresh(new_vetwork)
    
    await add_diseases_in_vetwork(session=session, vetwork_id=new_vetwork.id, diseases=diseases)
    await add_doctors_in_vetwork(session=session, vetwork_id=new_vetwork.id, doctors=doctors)
    return new_vetwork

async def create_diagnostic(session: AsyncSession, body: DiagnosticIn) -> VetWork:
    diseases = body.diseases
    doctors = body.doctors
    new_vetwork = VetWork(**body.model_dump(exclude={"diseases", "doctors"}))
    session.add(new_vetwork)
    await session.commit()
    await session.refresh(new_vetwork)
    
    await add_diseases_in_vetwork(session=session, vetwork_id=new_vetwork.id, diseases=diseases)
    await add_doctors_in_vetwork(session=session, vetwork_id=new_vetwork.id, doctors=doctors)
    return new_vetwork
    
async def add_diseases_in_vetwork(session: AsyncSession, vetwork_id: int, diseases: list[int]) -> None:
    new_relations = [DiseaseInVetWork(vetwork_id=vetwork_id, disease_id=item) for item in diseases]
    session.add_all(new_relations)
    await session.commit()
    
    
async def add_doctors_in_vetwork(session: AsyncSession, vetwork_id: int, doctors: list[int]) -> None:
    new_relations = [DoctorInVetWork(vetwork_id=vetwork_id, employee_id=item) for item in doctors]
    session.add_all(new_relations)
    await session.commit()


async def add_company_to_vetwork(session: AsyncSession, vetwork: VetWork, body: CompanyInVetWorkIn) -> None:
    new_relation = CompanyInVetWork(
        vetwork_id=vetwork.id,
        company_id=body.company_id
        )
    session.add(new_relation)
    await session.commit()


async def add_animals_to_vetwork(session: AsyncSession, vetwork: VetWork, body: list[AnimalInVetWorkIn]) -> None:
    new_relations = [
        AnimalInVetWork(
            **item.model_dump(),
            vetwork_id=vetwork.id
            ) for item in body
        ]
    
    session.add_all(new_relations)
    await session.commit()
    

async def add_drug_to_vetwork(session: AsyncSession, vetwork: VetWork, body: DrugInMovementIn) -> None:
    new_drug_movement = DrugMovement(operation_id=2, operation_date=vetwork.vetwork_date)
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


async def read_vaccinations(session: AsyncSession) -> list[VetWork]:
    stmt = (
        select(VetWork)
        .options(selectinload(VetWork.diseases_details)
        .joinedload(DiseaseInVetWork.disease
        ))
        .where(VetWork.work_type_id == 1)
        .order_by(desc(VetWork.vetwork_date))
    )
    return list(await session.scalars(stmt))


async def read_diagnostics(session: AsyncSession) -> list[VetWork]:
    stmt = (
        select(VetWork)
        .options(selectinload(VetWork.diseases_details)
        .joinedload(DiseaseInVetWork.disease))
        .where(VetWork.work_type_id == 2)
        .order_by(desc(VetWork.vetwork_date))
    )
    return list(await session.scalars(stmt))


async def read_vetwork_by_id(session: AsyncSession, vetwork_id: int) -> VetWork | None:
    stmt = (
        select(VetWork)
        .options(selectinload(VetWork.diseases_details)
        .joinedload(DiseaseInVetWork.disease
        ))
        .where(VetWork.id == vetwork_id)
    )
    return await session.scalar(stmt)


async def read_animals_in_vetwork(session: AsyncSession, vetwork: VetWork) -> list[AnimalInVetWork]:
    stmt = (
        select(AnimalInVetWork)
        .options(joinedload(AnimalInVetWork.animal))
        .where(AnimalInVetWork.vetwork_id == vetwork.id)
        )
    return list(await session.scalars(stmt))


async def read_companies_in_vetwork(session: AsyncSession, vetwork: VetWork) -> list[CompanyInVetWork]:
    stmt = (
        select(CompanyInVetWork)
        .options(joinedload(CompanyInVetWork.company))
        .where(CompanyInVetWork.vetwork_id == vetwork.id)
        )
    return list(await session.scalars(stmt))
    
    
async def read_doctors_in_vetwork(session: AsyncSession, vetwork: VetWork) -> list[DoctorInVetWork]:
    stmt = (
        select(DoctorInVetWork)
        .options(joinedload(DoctorInVetWork.doctor))
        .where(DoctorInVetWork.vetwork_id == vetwork.id)
        )
    return list(await session.scalars(stmt))


async def read_drug_in_vetwork(session: AsyncSession, vetwork: VetWork) -> DrugInMovement:
    stmt = (
        select(DrugInMovement)
        .options(joinedload(DrugInMovement.catalog_drug))
        .where(DrugInMovement.drug_movement_id == vetwork.drug_movement_id)
        )
    return await session.scalar(stmt)


async def read_biomaterial_fixations(session: AsyncSession) -> list[BiomaterialFixation]:
    stmt = (
        select(BiomaterialFixation).order_by(BiomaterialFixation.name)
    )
    return list(await session.scalars(stmt))

async def read_biomaterials(session: AsyncSession) -> list[Biomaterial]:
    stmt = (
        select(Biomaterial).order_by(Biomaterial.name)
    )
    return list(await session.scalars(stmt))

async def read_biomaterial_packages(session: AsyncSession) -> list[BiomaterialPackage]:
    stmt = (
        select(BiomaterialPackage).order_by(BiomaterialPackage.name)
    )
    return list(await session.scalars(stmt))


async def read_diagnosic_methods(session: AsyncSession) -> list[DiagnosticMethod]:
    stmt = (
        select(DiagnosticMethod).order_by(DiagnosticMethod.name)
    )
    return list(await session.scalars(stmt))


# DELETE

async def delete_vetwork(session: AsyncSession, vetwork: VetWork) -> None:
    await session.delete(vetwork)
    await session.commit()


