import csv
from io import StringIO
from operator import and_

from fastapi import File, UploadFile
from sqlalchemy import select, desc
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import Disease, VetWork, DiseaseInVetWork, DoctorInVetWork
from .schemas import VetWorkIn


# Create
async def create_disease(session: AsyncSession, name: str) -> None:
    new_disease = Disease(name=name)
    session.add(new_disease)
    await session.commit()
    
    
async def create_vetwork(session: AsyncSession, body: VetWorkIn) -> VetWork: 
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
    


# Read
async def read_diseases(session: AsyncSession) -> list[Disease]:
    stmt = select(Disease).order_by(Disease.name)
    return list(await session.scalars(stmt))

async def read_vaccinations(session: AsyncSession) -> list[VetWork]:
    stmt = (
        select(VetWork)
        .options(selectinload(DiseaseInVetWork.diseases_details)
        .joinedload(DiseaseInVetWork.disease
        ))
        .where(VetWork.work_type_id == 1)
        .order_by(desc(VetWork.vetwork_date))
    )
    return list(await session.scalars(stmt))
