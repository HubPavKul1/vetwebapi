import csv
from io import StringIO
from operator import and_

from sqlalchemy import select, desc, Subquery, func, cast, Integer
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import VetWork, AnimalInVetWork, Animal, Species, AnimalGroup, Disease, DiseaseInVetWork

from .schemas import DateRangeIn



async def diagnostic_ids_between_date_range(session: AsyncSession, body: DateRangeIn) -> list[int]:
    date_start = body.date_start
    date_end = body.date_end
    
    query = (
        select(
            VetWork.id
        )
        .filter(and_(VetWork.vetwork_date.between(date_start, date_end), VetWork.work_type_id == 2))
        
    )
    return list(await session.scalars(query))


async def vaccinations_ids_between_date_range(session: AsyncSession, body: DateRangeIn) -> list[int]:
    date_start = body.date_start
    date_end = body.date_end
    
    query = (
        select(
            VetWork.id
        )
        .filter(and_(VetWork.vetwork_date.between(date_start, date_end), VetWork.work_type_id == 1))
        
    )
    return list(await session.scalars(query))


async def animals_in_vetwork(
        vetwork_ids: list[int]
       
        ) -> Subquery:

    query = (
        select(
            AnimalInVetWork.vetwork_id.label("vetwork_id"),
            AnimalInVetWork.is_positive.cast(Integer).label("is_positive"),
            Animal.id.label("animal_id"),
            Species.id.label("species_id"),
            AnimalGroup.name.label("animal_group"),
        )
        .filter(AnimalInVetWork.vetwork_id.in_(vetwork_ids))
        .join(Animal, Animal.species_id == Species.id)  
        .join(AnimalGroup, AnimalGroup.id == Species.animal_group_id) 
        .join(AnimalInVetWork, AnimalInVetWork.animal_id == Animal.id)
        .subquery("animals_in_vetwork")

    )

    return query


async def diseases_in_vetwork(vetwork_ids: list[int]) -> Subquery:
    query = (
        select(
            DiseaseInVetWork.vetwork_id.label("vetwork_id"),
            Disease.name.label("disease"),

        )
        .filter(DiseaseInVetWork.vetwork_id.in_(vetwork_ids))
        .join(Disease, Disease.id == DiseaseInVetWork.disease_id)
        .subquery("diseases_in_vetwork")
    )

    return query


async def animals_data_in_vetwork( vetwork_ids: list[int]) -> Subquery:
    animals: Subquery = await animals_in_vetwork(vetwork_ids=vetwork_ids)
   
    query = (
        select(
            animals.c.vetwork_id.label("vetwork_id"),
            animals.c.animal_group.label("animal_group"),
            func.count(animals.c.animal_group).label("animals_count"),
            func.sum(animals.c.is_positive).label("positive_count")

        )
        .group_by(animals.c.vetwork_id, animals.c.animal_group, animals.c.is_positive)
        .subquery("animals_data_in_vetwork")
        
    )

    return query


async def diagnostic_report(session: AsyncSession, body: DateRangeIn) -> list[tuple]:
    vetwork_ids: list[int] = await diagnostic_ids_between_date_range(session=session, body=body)

    animals: Subquery = await animals_data_in_vetwork(vetwork_ids=vetwork_ids)
    diseases: Subquery = await diseases_in_vetwork(vetwork_ids=vetwork_ids)

    query = (
        select(
            # diseases.c.vetwork_id.label("vetwork_id"),
            animals.c.animal_group.label("animal_group"),
            diseases.c.disease.label("disease"), 
            animals.c.animals_count.label("animals_count"),
            animals.c.positive_count.label("positive_count")
        )
        .join(animals, animals.c.vetwork_id == diseases.c.vetwork_id)
    )

    return list(await session.execute(query))


async def vaccination_report(session: AsyncSession, body: DateRangeIn) -> list[tuple]:
    vetwork_ids: list[int] = await vaccinations_ids_between_date_range(session=session, body=body)

    animals: Subquery = await animals_data_in_vetwork(vetwork_ids=vetwork_ids)
    diseases: Subquery = await diseases_in_vetwork(vetwork_ids=vetwork_ids)

    query = (
        select(
            animals.c.animal_group.label("animal_group"),
            diseases.c.disease.label("disease"), 
            animals.c.animals_count.label("animals_count"),
        )
        .join(animals, animals.c.vetwork_id == diseases.c.vetwork_id)
    )

    return list(await session.execute(query))

