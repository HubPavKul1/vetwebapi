import csv
from io import StringIO
from operator import and_

from sqlalchemy import select, desc, Subquery, func
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import VetWork, AnimalInVetWork, Animal, Species, AnimalGroup, Disease, DiseaseInVetWork

from vetwebapi.api_v1.drug.reports.schemas import DateRangeIn



async def diagnostic_ids_between_date_range(body: DateRangeIn) -> Subquery:
    date_start = body.date_start
    date_end = body.date_end
    
    query = (
        select(
            VetWork.id.label("vetwork_id")
        )
        .filter(and_(VetWork.vetwork_date.between(date_start, date_end), VetWork.work_type_id == 2))
        .subquery("diagnostic_ids_between_date_range")
    )
    return query


async def vaccinations_ids_between_date_range(body: DateRangeIn) -> Subquery:
    date_start = body.date_start
    date_end = body.date_end
    
    query = (
        select(
            VetWork.id.label("vetwork_id")
        )
        .filter(and_(VetWork.vetwork_date.between(date_start, date_end), VetWork.work_type_id == 1))
        .subquery("vaccination_ids")
    )
    return query


async def animals_in_vetwork() -> Subquery:
    query = (
        select(
            AnimalInVetWork.vetwork_id.label("vetwork_id"),
            AnimalInVetWork.is_positive.label("is_positive"),
            Animal.id.label("animal_id"),
            Species.id.label("species_id"),
            AnimalGroup.name.label("animal_group"),
        )
        .join(Animal, Animal.species_id == Species.id)  
        .join(AnimalGroup, AnimalGroup.id == Species.animal_group_id) 
        .join(AnimalInVetWork, AnimalInVetWork.animal_id == Animal.id)
        .subquery("animals_in_vetwork")

    )

    return query


async def diseases_in_vetwork() -> Subquery:
    query = (
        select(
            DiseaseInVetWork.vetwork_id.label("vetwork_id"),
            Disease.name.label("disease"),

        )
        .join(Disease, Disease.id == DiseaseInVetWork.disease_id)
        .subquery("diseases_in_vetwork")
    )

    return query


async def animals_data_in_vetwork() -> Subquery:
    animals = await animals_in_vetwork()
   
    query = (
        select(
            animals.c.vetwork_id.label("vetwork_id"),
            animals.c.animal_group.label("animal_group"),
            animals.c.is_positive.label("is_positive"),
            func.count(animals.c.animal_group).label("animals_count")

        )
        .group_by(animals.c.vetwork_id, animals.c.animal_group, animals.c.is_positive)
        .subquery("animals_data_in_vetwork")
        
    )

    return query


async def diagnostic_report(session: AsyncSession, body: DateRangeIn):
    vetwork = diagnostic_ids_between_date_range(body=body)

    animals = animals_data_in_vetwork()
    diseases = diseases_in_vetwork()

    query = (
        select(
            vetwork.c.vetwork_id.label("vetwork_id"),
            diseases.c.disease.label("disease"),
            animals.c.animal_group.label("animal_group"),
            animals.c.is_positive.label("is_positive"),
            animals.c.animals_count.label("animals_count")
        )
        .join(vetwork, vetwork.c.vetwork_id == animals.c.vetwork_id)
        .join(vetwork, vetwork.c.vetwork_id == diseases.c.vetwork_id)
    )

    return list(await session.execute(query))

