from typing import Any, Iterable

from sqlalchemy import Float, Integer, Row, Subquery, and_, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.schemas import DateRangeIn
from core.models import (
    AnimalInVetWork,
    CatalogDrug,
    Disease,
    Drug,
    DrugDisease,
    DrugInMovement,
    DrugMovement,
    VetWork,
)


# catalog_drug_info
async def catalog_drug_info() -> Subquery:
    return (
        select(
            Drug.name.label("drug_name"),
            Drug.packing.label("packing"),
            Drug.id.label("drug_id"),
            CatalogDrug.id.label("cd_id"),
            CatalogDrug.batch.label("batch"),
            CatalogDrug.control.label("control"),
            CatalogDrug.production_date.label("production_date"),
            CatalogDrug.expiration_date.label("expiration_date"),
        )
        .join(Drug, Drug.id == CatalogDrug.drug_id)
        .subquery("catalog_drug_info")
    )


async def drug_diseases(session: AsyncSession, drug_id: int) -> list[str]:
    query = (
        select(Disease.name.label("disease"))
        .where(DrugDisease.drug_id == drug_id)
        .join(DrugDisease, DrugDisease.disease_id == Disease.id)
    )
    result = list(await session.execute(query))
    return [disease[0] for disease in result]


# async def catalog_drug_with_diseases(
#     session: AsyncSession,
# ) -> list[Iterable[tuple[Any, ...]]]:
#     catalog_drug = await catalog_drug_info()
#     diseases = await drug_diseases(session=session, drug_id=int(catalog_drug.c.drug_id))

#     query = select(
#         catalog_drug.c.drug_name.label("drug_name"),
#         catalog_drug.c.packing.label("packing"),
#         catalog_drug.c.cd_id.label("cd_id"),
#         catalog_drug.c.batch.label("batch"),
#         catalog_drug.c.control.label("control"),
#         catalog_drug.c.production_date.label("production_date"),
#         catalog_drug.c.expiration_date.label("expiration_date"),
#         # diseases.label("disease"),
#     )
#     return list(await session.execute(query))


# vetwork between date range
async def read_vetworks_data_between_date_range(body: DateRangeIn) -> Subquery:
    date_start = body.date_start
    date_end = body.date_end

    return (
        select(VetWork.id.label("vetwork_id"), VetWork.drug_movement_id.label("dm_id"))
        .filter(VetWork.vetwork_date.between(date_start, date_end))
        .subquery("vetworks_data_between_date_range")
    )


# animals count in vetworks
async def animals_count_in_vetworks_between_date_range(body: DateRangeIn) -> Subquery:
    vetworks = await read_vetworks_data_between_date_range(body=body)

    return (
        select(
            vetworks.c.dm_id.label("dm_id"),
            func.count(AnimalInVetWork.animal_id).label("animals_count"),
        )
        .join(AnimalInVetWork, AnimalInVetWork.vetwork_id == vetworks.c.vetwork_id)
        .group_by(vetworks.c.dm_id)
        .subquery("animals count in vetwork")
    )


# animals_count catalog_drugs
async def animals_count_catalog_drug_id(body: DateRangeIn) -> Subquery:
    animals_count = await animals_count_in_vetworks_between_date_range(body=body)

    return (
        select(
            animals_count.c.animals_count.label("animals_count"),
            DrugInMovement.catalog_drug_id.label("cd_id"),
        )
        .join(DrugInMovement, DrugInMovement.drug_movement_id == animals_count.c.dm_id)
        .subquery("animals_count_catalog_drug_id")
    )


# received receipts ids
async def read_receipts_ids_between_date_range(
    session: AsyncSession, body: DateRangeIn
) -> list[int]:
    date_start = body.date_start
    date_end = body.date_end

    stmt = select(DrugMovement.id).filter(
        and_(
            DrugMovement.operation_id == 1,
            DrugMovement.operation_date.between(date_start, date_end),
        )
    )

    return list(await session.scalars(stmt))


async def read_receipts_ids_before_date_start(
    session: AsyncSession, body: DateRangeIn
) -> list[int]:
    date_start = body.date_start

    stmt = select(DrugMovement.id).filter(
        and_(DrugMovement.operation_id == 1, DrugMovement.operation_date < date_start)
    )

    return list(await session.scalars(stmt))


# get catalog drugs by drug movement ids
async def catalog_drugs_received_between_date_range(
    session: AsyncSession, body: DateRangeIn
) -> Subquery:
    receipt_ids = await read_receipts_ids_between_date_range(session=session, body=body)

    return (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("packs_received"),
            func.sum(DrugInMovement.units_amount).label("units_received"),
        )
        .filter(DrugInMovement.drug_movement_id.in_(receipt_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("catalog_drugs_received_between_date_range")
    )


async def catalog_drugs_received_before_date_start(
    session: AsyncSession, body: DateRangeIn
) -> Subquery:
    receipt_ids = await read_receipts_ids_before_date_start(session=session, body=body)

    return (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("packs_received"),
            func.sum(DrugInMovement.units_amount).label("units_received"),
        )
        .filter(DrugInMovement.drug_movement_id.in_(receipt_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("catalog_drugs_received_before_date_start")
    )


# spent drugs queries
async def read_drug_spent_ids_between_date_range(
    session: AsyncSession, body: DateRangeIn
) -> list[int]:
    date_start = body.date_start
    date_end = body.date_end

    stmt = select(DrugMovement.id).filter(
        and_(
            DrugMovement.operation_id == 2,
            DrugMovement.operation_date.between(date_start, date_end),
        )
    )

    return list(await session.scalars(stmt))


async def read_drug_spent_ids_before_date_start(
    session: AsyncSession, body: DateRangeIn
) -> list[int]:
    date_start = body.date_start

    stmt = select(DrugMovement.id).filter(
        and_(DrugMovement.operation_id == 2, DrugMovement.operation_date < date_start)
    )

    return list(await session.scalars(stmt))


async def catalog_drugs_spent_between_date_range(
    session: AsyncSession, body: DateRangeIn
) -> Subquery:
    spent_ids = await read_drug_spent_ids_between_date_range(session=session, body=body)

    return (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("packs_spent"),
            func.sum(DrugInMovement.units_amount).label("units_spent"),
        )
        .filter(DrugInMovement.drug_movement_id.in_(spent_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("catalog_drugs_spent_between_date_range")
    )


async def catalog_drugs_spent_before_date_start(
    session: AsyncSession, body: DateRangeIn
) -> Subquery:
    spent_ids = await read_drug_spent_ids_before_date_start(session=session, body=body)

    return (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("packs_spent"),
            func.sum(DrugInMovement.units_amount).label("units_spent"),
        )
        .filter(DrugInMovement.drug_movement_id.in_(spent_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("catalog_drugs_spent_before_date_start")
    )


# catalog_drugs received and spent before date_range
async def catalog_drugs_received_and_spent_before_date_start(
    session: AsyncSession, body: DateRangeIn
) -> Subquery:
    received_drugs = await catalog_drugs_received_before_date_start(
        session=session, body=body
    )
    spent_drugs = await catalog_drugs_spent_before_date_start(
        session=session, body=body
    )

    return (
        select(
            received_drugs.c.cd_id.label("cd_id"),
            received_drugs.c.packs_received.label("packs_received"),
            received_drugs.c.units_received.label("units_received"),
            spent_drugs.c.packs_spent.label("packs_spent"),
            spent_drugs.c.units_spent.label("units_spent"),
            (
                received_drugs.c.packs_received
                - func.coalesce(spent_drugs.c.packs_spent, 0)
            )
            .cast(Integer)
            .label("packs_rest"),
        )
        .join(spent_drugs, spent_drugs.c.cd_id == received_drugs.c.cd_id, isouter=True)
        .subquery("catalog_drugs_received_and_spent_before_date_start")
    )


async def catalog_drug_rest_before_date_start(
    session: AsyncSession, body: DateRangeIn
) -> Subquery:
    catalog_drugs_movement = await catalog_drugs_received_and_spent_before_date_start(
        session=session, body=body
    )
    c_d_info = await catalog_drug_info()

    return (
        select(
            c_d_info.c.cd_id.label("cd_id"),
            c_d_info.c.packing,
            catalog_drugs_movement.c.packs_received,
            catalog_drugs_movement.c.units_received,
            catalog_drugs_movement.c.packs_spent,
            catalog_drugs_movement.c.units_spent,
            (
                (
                    c_d_info.c.packing
                    * func.coalesce(catalog_drugs_movement.c.packs_spent, 0)
                )
                - func.coalesce(catalog_drugs_movement.c.units_spent, 0)
            ).cast(Float),
            catalog_drugs_movement.c.packs_rest.label("packs_rest"),
            (c_d_info.c.packing * catalog_drugs_movement.c.packs_rest)
            .cast(Float)
            .label("units_rest"),
        )
        .join(
            catalog_drugs_movement, catalog_drugs_movement.c.cd_id == c_d_info.c.cd_id
        )
        .subquery("catalog_drug_rest_before_date_start")
    )


# catalog_drug_rest
async def catalog_drug_rest(
    session: AsyncSession, body: DateRangeIn, drug_id: int
) -> Row[Any]:
    c_d_info = await catalog_drug_info()
    c_d_rest_start = await catalog_drug_rest_before_date_start(
        session=session, body=body
    )
    received_drugs = await catalog_drugs_received_between_date_range(
        session=session, body=body
    )
    spent_drugs = await catalog_drugs_spent_between_date_range(
        session=session, body=body
    )

    query = (
        select(
            c_d_info.c.cd_id.label("cd_id"),
            received_drugs.c.packs_received.label("packs_received"),
            received_drugs.c.units_received.label("units_received"),
            spent_drugs.c.packs_spent.label("packs_spent"),
            spent_drugs.c.units_spent.label("units_spent"),
            (
                (c_d_info.c.packing * func.coalesce(spent_drugs.c.packs_spent, 0))
                - func.coalesce(spent_drugs.c.units_spent, 0)
            )
            .cast(Float)
            .label("disposed_units"),
            (c_d_info.c.packing * func.coalesce(spent_drugs.c.packs_spent, 0))
            .cast(Float)
            .label("units_spent_disposed"),
            (
                func.coalesce(c_d_rest_start.c.packs_rest, 0)
                + func.coalesce(received_drugs.c.packs_received, 0)
                - func.coalesce(spent_drugs.c.packs_spent, 0)
            )
            .cast(Integer)
            .label("packs_rest_end"),
            (
                c_d_info.c.packing
                * (
                    func.coalesce(c_d_rest_start.c.packs_rest, 0)
                    + func.coalesce(received_drugs.c.packs_received, 0)
                    - func.coalesce(spent_drugs.c.packs_spent, 0)
                )
            )
            .cast(Float)
            .label("units_rest_end"),
        )
        .filter(c_d_info.c.cd_id == drug_id)
        .join(c_d_rest_start, c_d_rest_start.c.cd_id == c_d_info.c.cd_id, isouter=True)
        .join(received_drugs, received_drugs.c.cd_id == c_d_info.c.cd_id, isouter=True)
        .join(spent_drugs, spent_drugs.c.cd_id == c_d_info.c.cd_id, isouter=True)
    )
    return list(await session.execute(query))[0]


# catalog_drugs movement main query
async def catalog_drugs_movement_report(
    session: AsyncSession, body: DateRangeIn
) -> list[Iterable[tuple[Any, ...]]]:
    c_d_info = await catalog_drug_info()
    c_d_rest_start = await catalog_drug_rest_before_date_start(
        session=session, body=body
    )
    received_drugs = await catalog_drugs_received_between_date_range(
        session=session, body=body
    )
    spent_drugs = await catalog_drugs_spent_between_date_range(
        session=session, body=body
    )

    query = (
        select(
            c_d_info.c.cd_id.label("cd_id"),
            c_d_info.c.drug_name.label("drug_name"),
            c_d_info.c.batch.label("batch"),
            c_d_info.c.control.label("control"),
            c_d_info.c.production_date.label("production_date"),
            c_d_info.c.expiration_date.label("expiration_date"),
            c_d_info.c.packing.label("packing"),
            c_d_rest_start.c.packs_rest.label("packs_rest_start"),
            c_d_rest_start.c.units_rest.label("units_rest_start"),
            received_drugs.c.packs_received.label("packs_received"),
            received_drugs.c.units_received.label("units_received"),
            spent_drugs.c.packs_spent.label("packs_spent"),
            spent_drugs.c.units_spent.label("units_spent"),
            (
                (c_d_info.c.packing * func.coalesce(spent_drugs.c.packs_spent, 0))
                - func.coalesce(spent_drugs.c.units_spent, 0)
            )
            .cast(Float)
            .label("disposed_units"),
            (c_d_info.c.packing * func.coalesce(spent_drugs.c.packs_spent, 0))
            .cast(Float)
            .label("units_spent_disposed"),
            (
                func.coalesce(c_d_rest_start.c.packs_rest, 0)
                + func.coalesce(received_drugs.c.packs_received, 0)
                - func.coalesce(spent_drugs.c.packs_spent, 0)
            )
            .cast(Integer)
            .label("packs_rest_end"),
            (
                c_d_info.c.packing
                * (
                    func.coalesce(c_d_rest_start.c.packs_rest, 0)
                    + func.coalesce(received_drugs.c.packs_received, 0)
                    - func.coalesce(spent_drugs.c.packs_spent, 0)
                )
            )
            .cast(Float)
            .label("units_rest_end"),
        )
        .join(c_d_rest_start, c_d_rest_start.c.cd_id == c_d_info.c.cd_id, isouter=True)
        .join(received_drugs, received_drugs.c.cd_id == c_d_info.c.cd_id, isouter=True)
        .join(spent_drugs, spent_drugs.c.cd_id == c_d_info.c.cd_id, isouter=True)
    )

    return list(await session.execute(query))


# 1 VetB queries
async def catalog_drugs_movement_for_1vetB(
    session: AsyncSession, body: DateRangeIn
) -> Subquery:
    c_d_info = await catalog_drug_info()
    c_d_rest_start = await catalog_drug_rest_before_date_start(
        session=session, body=body
    )
    received_drugs = await catalog_drugs_received_between_date_range(
        session=session, body=body
    )
    spent_drugs = await catalog_drugs_spent_between_date_range(
        session=session, body=body
    )

    return (
        select(
            c_d_info.c.cd_id.label("cd_id"),
            c_d_info.c.drug_name.label("drug_name"),
            c_d_info.c.drug_id.label("drug_id"),
            c_d_info.c.batch.label("batch"),
            c_d_info.c.control.label("control"),
            c_d_info.c.production_date.label("production_date"),
            c_d_info.c.expiration_date.label("expiration_date"),
            c_d_info.c.packing.label("packing"),
            c_d_rest_start.c.packs_rest.label("packs_rest_start"),
            c_d_rest_start.c.units_rest.label("units_rest_start"),
            received_drugs.c.packs_received.label("packs_received"),
            received_drugs.c.units_received.label("units_received"),
            spent_drugs.c.packs_spent.label("packs_spent"),
            spent_drugs.c.units_spent.label("units_spent"),
            (
                (c_d_info.c.packing * func.coalesce(spent_drugs.c.packs_spent, 0))
                - func.coalesce(spent_drugs.c.units_spent, 0)
            )
            .cast(Float)
            .label("disposed_units"),
            (c_d_info.c.packing * func.coalesce(spent_drugs.c.packs_spent, 0))
            .cast(Float)
            .label("units_spent_disposed"),
            (
                func.coalesce(c_d_rest_start.c.packs_rest, 0)
                + func.coalesce(received_drugs.c.packs_received, 0)
                - func.coalesce(spent_drugs.c.packs_spent, 0)
            )
            .cast(Integer)
            .label("packs_rest_end"),
            (
                c_d_info.c.packing
                * (
                    func.coalesce(c_d_rest_start.c.packs_rest, 0)
                    + func.coalesce(received_drugs.c.packs_received, 0)
                    - func.coalesce(spent_drugs.c.packs_spent, 0)
                )
            )
            .cast(Float)
            .label("units_rest_end"),
        )
        .join(c_d_rest_start, c_d_rest_start.c.cd_id == c_d_info.c.cd_id, isouter=True)
        .join(received_drugs, received_drugs.c.cd_id == c_d_info.c.cd_id, isouter=True)
        .join(spent_drugs, spent_drugs.c.cd_id == c_d_info.c.cd_id, isouter=True)
        .subquery("catalog_drugs_movement_for_1vetB")
    )


async def report_1B(
    session: AsyncSession, body: DateRangeIn
) -> list[Iterable[tuple[Any, ...]]]:
    c_d_movement = await catalog_drugs_movement_for_1vetB(session=session, body=body)
    animals_count = await animals_count_catalog_drug_id(body=body)

    stmt = select(
        c_d_movement.c.cd_id.label("cd_id"),
        c_d_movement.c.drug_name.label("drug_name"),
        c_d_movement.c.drug_id.label("drug_id"),
        c_d_movement.c.batch.label("batch"),
        c_d_movement.c.packing.label("packing"),
        c_d_movement.c.units_rest_start.label("units_rest_start"),
        c_d_movement.c.units_received.label("units_received"),
        c_d_movement.c.units_spent.label("units_spent"),
        animals_count.c.animals_count.label("animals_count"),
        c_d_movement.c.disposed_units.label("disposed_units"),
        c_d_movement.c.units_spent_disposed.label("units_spent_disposed"),
        c_d_movement.c.units_rest_end.label("units_rest_end"),
    ).join(animals_count, animals_count.c.cd_id == c_d_movement.c.cd_id, isouter=True)

    return list(await session.execute(stmt))
