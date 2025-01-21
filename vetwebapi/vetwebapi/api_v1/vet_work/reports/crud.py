from operator import and_, or_
from typing import Any

from sqlalchemy import Integer, Result, Select, Subquery, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.schemas import DateRangeIn
from core.models import (
    Animal,
    AnimalGroup,
    AnimalInVetWork,
    Disease,
    DiseaseInVetWork,
    Species,
    VetWork,
    CompanyInVetWork,
    WorkType,
)


async def diagnostic_ids_between_date_range(
    session: AsyncSession, body: DateRangeIn
) -> list[int]:
    date_start = body.date_start
    date_end = body.date_end

    query = select(VetWork.id).filter(
        and_(
            VetWork.vetwork_date.between(date_start, date_end),
            VetWork.work_type_id == 2,
        )
    )
    return list(await session.scalars(query))


async def vaccination_treatment_ids_between_date_range(
    session: AsyncSession, body: DateRangeIn
) -> list[int]:
    date_start = body.date_start
    date_end = body.date_end

    query = select(VetWork.id).filter(
        and_(
            VetWork.vetwork_date.between(date_start, date_end),
            or_(VetWork.work_type_id == 1, VetWork.work_type_id == 3),
        )
    )
    return list(await session.scalars(query))


async def animals_in_vetwork(vetwork_ids: list[int]) -> Subquery:
    return (
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


async def diseases_in_vetwork(vetwork_ids: list[int]) -> Subquery:
    return (
        select(
            DiseaseInVetWork.vetwork_id.label("vetwork_id"),
            Disease.name.label("disease"),
        )
        .filter(DiseaseInVetWork.vetwork_id.in_(vetwork_ids))
        .join(Disease, Disease.id == DiseaseInVetWork.disease_id)
        .subquery("diseases_in_vetwork")
    )


async def animals_data_in_vetwork(vetwork_ids: list[int]) -> Subquery:
    animals: Subquery = await animals_in_vetwork(vetwork_ids=vetwork_ids)

    return (
        select(
            animals.c.vetwork_id.label("vetwork_id"),
            animals.c.animal_group.label("animal_group"),
            func.count(animals.c.animal_group).label("animals_count"),
            func.sum(animals.c.is_positive).label("positive_count"),
        )
        .group_by(animals.c.vetwork_id, animals.c.animal_group, animals.c.is_positive)
        .subquery("animals_data_in_vetwork")
    )


async def diagnostic_report(session: AsyncSession, body: DateRangeIn) -> Result[Any]:
    vetwork_ids: list[int] = await diagnostic_ids_between_date_range(
        session=session, body=body
    )

    animals: Subquery = await animals_data_in_vetwork(vetwork_ids=vetwork_ids)
    diseases: Subquery = await diseases_in_vetwork(vetwork_ids=vetwork_ids)

    query: Select[Any] = (
        select(
            animals.c.animal_group.label("animal_group"),
            diseases.c.disease.label("disease"),
            func.sum(animals.c.animals_count).label("animals_count"),
            func.sum(animals.c.positive_count).label("positive_count"),
        )
        .join(animals, animals.c.vetwork_id == diseases.c.vetwork_id)
        .group_by(animals.c.animal_group, diseases.c.disease)
    )

    return await session.execute(query)


async def vaccination_treatment_report(
    session: AsyncSession, body: DateRangeIn
) -> Result[Any]:
    vetwork_ids: list[int] = await vaccination_treatment_ids_between_date_range(
        session=session, body=body
    )

    animals: Subquery = await animals_data_in_vetwork(vetwork_ids=vetwork_ids)
    diseases: Subquery = await diseases_in_vetwork(vetwork_ids=vetwork_ids)

    query: Select[Any] = (
        select(
            animals.c.animal_group.label("animal_group"),
            diseases.c.disease.label("disease"),
            func.sum(animals.c.animals_count).label("animals_count"),
        )
        .join(animals, animals.c.vetwork_id == diseases.c.vetwork_id)
        .group_by(animals.c.animal_group, diseases.c.disease)
    )

    return await session.execute(query)


async def get_company_vetworks_by_date_range(
    session: AsyncSession, company_id: int, body: DateRangeIn
) -> Result[Any]:
    query: Select[Any] = (
        select(
            CompanyInVetWork.company_id.label("company_id"),
            VetWork.vetwork_date.label("vetwork_date"),
            WorkType.name.label("work_type"),
            Disease.name.label("disease"),
            func.count(AnimalInVetWork.animal_id),
        )
        .filter(
            and_(
                VetWork.vetwork_date.between(body.date_start, body.date_end),
                CompanyInVetWork.company_id == company_id,
            )
        )
        .join(WorkType, WorkType.id == VetWork.work_type_id)
        .join(CompanyInVetWork, CompanyInVetWork.vetwork_id == VetWork.id)
        .join(DiseaseInVetWork, DiseaseInVetWork.vetwork_id == VetWork.id)
        .join(Disease, Disease.id == DiseaseInVetWork.disease_id)
        .group_by(
            CompanyInVetWork.company_id,
            VetWork.vetwork_date,
            WorkType.name,
            Disease.name,
        )
    )

    return await session.execute(query)
