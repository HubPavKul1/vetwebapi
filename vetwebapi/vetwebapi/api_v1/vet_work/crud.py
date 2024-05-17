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
    )

from vetwebapi.api_v1.drug.receipts.schemas import DrugInMovementIn
from .schemas import VaccinationIn, AnimalInVetWorkIn


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
    
    
async def add_diseases_in_vetwork(session: AsyncSession, vetwork_id: int, diseases: list[int]) -> None:
    new_relations = [DiseaseInVetWork(vetwork_id=vetwork_id, disease_id=item) for item in diseases]
    session.add_all(new_relations)
    await session.commit()
    
    
async def add_doctors_in_vetwork(session: AsyncSession, vetwork_id: int, doctors: list[int]) -> None:
    new_relations = [DoctorInVetWork(vetwork_id=vetwork_id, employee_id=item) for item in doctors]
    session.add_all(new_relations)
    await session.commit()


async def add_animals_to_vetwork(session: AsyncSession, vetwork: VetWork, animals: list[AnimalInVetWorkIn]) -> None:
    new_relations = [
        AnimalInVetWork(
            **item.model_dump(),
            vetwork_id=vetwork.id
            ) for item in animals
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


async def delete_vetwork(session: AsyncSession, vetwork: VetWork) -> None:
    
    # doctors_in_vetwork: list[DoctorInVetWork] = await read_doctors_in_vetwork(session=session, vetwork=vetwork)
    # animals_in_vetwork: list[AnimalInVetWork] = await read_animals_in_vetwork(session=session, vetwork=vetwork)
    # if doctors_in_vetwork:
    #     [await session.delete(item) for item in doctors_in_vetwork]
    # if animals_in_vetwork:
    #     [await session.delete(item) for item in animals_in_vetwork]
    await session.delete(vetwork)
    await session.commit()


