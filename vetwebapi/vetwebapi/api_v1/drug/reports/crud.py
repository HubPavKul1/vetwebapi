from sqlalchemy import desc, select, func, cast, Integer, and_, Float, Subquery
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from vetwebapi.core.models import DrugInMovement, DrugMovement, Drug, CatalogDrug, VetWork, AnimalInVetWork

from .schemas import DateRangeIn

# catalog_drug_info
async def catalog_drug_info() -> Subquery:
    query = (
        select(
            Drug.name.label("drug_name"),
            Drug.packing.label("packing"),
            CatalogDrug.id.label("cd_id"),
            CatalogDrug.batch.label("batch"),
            CatalogDrug.control.label("control"),
            CatalogDrug.production_date.label("production_date"),
            CatalogDrug.expiration_date.label("expiration_date"),
        )
        .join(Drug, Drug.id == CatalogDrug.drug_id)
        .subquery("catalog_drug_info")
        
    )
    return query


# vetwork between date range
async def read_vetworks_data_between_date_range(session: AsyncSession, body: DateRangeIn) -> Subquery:
    date_start = body.date_start
    date_end = body.date_end
    
    query = (
        select(
            VetWork.id.label("vetwork_id"), 
            VetWork.drug_movement_id.label("dm_id")
        )
        .filter(VetWork.vetwork_date.between(date_start, date_end))
        .subquery("vetworks_data_between_date_range")
    )
    return query

# animals count in vetworks
async def animals_count_in_vetworks_between_date_range(session: AsyncSession, body: DateRangeIn) -> Subquery:
    vetworks = await read_vetworks_data_between_date_range(session=session, body=body)
    
    query = (
        select(
            vetworks.c.dm_id.label("dm_id"),
            func.count(AnimalInVetWork.animal_id).label("animals_count")
        )
        .join(AnimalInVetWork, AnimalInVetWork.vetwork_id == vetworks.c.vetwork_id)
        .group_by(vetworks.c.dm_id)
        .subquery("animals count in vetwork")
    )
    
    return query

# animals_count catalog_drugs
async def animals_count_catalog_drug_id(session: AsyncSession, body: DateRangeIn) -> Subquery:
    animals_count = await animals_count_in_vetworks_between_date_range(session=session, body=body)
    
    query = (
        select(
            animals_count.c.animals_count.label("animals_count"),
            DrugInMovement.catalog_drug_id.label("cd_id")
        )
        .join(DrugInMovement, DrugInMovement.drug_movement_id == animals_count.c.dm_id)
        .subquery("animals_count_catalog_drug_id")
    )
    
    return query





# received drugs queries
async def read_receipts_ids_between_date_range(session: AsyncSession, body: DateRangeIn) -> list[int]:
    date_start = body.date_start
    date_end = body.date_end

    stmt = (
        select(
            DrugMovement.id,
            )
        .filter(and_(DrugMovement.operation_id == 1, DrugMovement.operation_date.between(date_start, date_end)))
        )
    
    return list(await session.scalars(stmt))


async def read_receipts_ids_before_date_start(session: AsyncSession, body: DateRangeIn) -> list[int]:
    date_start = body.date_start
    
    stmt = (
        select(
            DrugMovement.id
            )
        .filter(
            and_(DrugMovement.operation_id == 1, 
                 DrugMovement.operation_date < date_start
                 ))
        )
    
    return list(await session.scalars(stmt))


async def catalog_drugs_received_between_date_range(session: AsyncSession, body: DateRangeIn) -> Subquery:
    
    receipt_ids = await read_receipts_ids_between_date_range(session=session, body=body)

    query = (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("packs_received"),
            func.sum(DrugInMovement.units_amount).label("units_received")
            )
        .filter(DrugInMovement.drug_movement_id.in_(receipt_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("catalog_drugs_received_between_date_range")
        )
    
    return query


async def catalog_drugs_received_before_date_start(session: AsyncSession, body: DateRangeIn) -> Subquery:
    
    receipt_ids = await read_receipts_ids_before_date_start(session=session, body=body)

    query = (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("packs_received"),
            func.sum(DrugInMovement.units_amount).label("units_received")
            )
        .filter(DrugInMovement.drug_movement_id.in_(receipt_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("catalog_drugs_received_before_date_start")
        )
    
    return query


# spent drugs queries
async def read_drug_spent_ids_between_date_range(session: AsyncSession, body: DateRangeIn) -> list[int]:
    date_start = body.date_start
    date_end = body.date_end

    stmt = (
        select(
            DrugMovement.id
            )
        .filter(and_(DrugMovement.operation_id == 2, DrugMovement.operation_date.between(date_start, date_end)))
        )
    
    return list(await session.scalars(stmt))


async def read_drug_spent_ids_before_date_start(session: AsyncSession, body: DateRangeIn) -> list[int]:
    date_start = body.date_start
    
    stmt = (
        select(
            DrugMovement.id
            )
        .filter(and_(
            DrugMovement.operation_id == 2,
            DrugMovement.operation_date < date_start
            ))
        )
    
    return list(await session.scalars(stmt))


async def catalog_drugs_spent_between_date_range(session: AsyncSession, body: DateRangeIn) -> Subquery:
    
    spent_ids = await read_drug_spent_ids_between_date_range(session=session, body=body)

    query = (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("packs_spent"),
            func.sum(DrugInMovement.units_amount).label("units_spent")
            )
        .filter(DrugInMovement.drug_movement_id.in_(spent_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("catalog_drugs_spent_between_date_range")
        )
    
    return query


async def catalog_drugs_spent_before_date_start(session: AsyncSession, body: DateRangeIn) -> Subquery:
    
    spent_ids = await read_drug_spent_ids_before_date_start(session=session, body=body)

    query = (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("packs_spent"),
            func.sum(DrugInMovement.units_amount).label("units_spent")
            )
        .filter(DrugInMovement.drug_movement_id.in_(spent_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("catalog_drugs_spent_before_date_start")
        )
    
    return query


# catalog_drugs amount before date_range
async def catalog_drugs_received_and_spent_before_date_start(session: AsyncSession, body: DateRangeIn) -> Subquery:
    received_drugs = await catalog_drugs_received_before_date_start(session=session, body=body)
    spent_drugs = await catalog_drugs_spent_before_date_start(session=session, body=body)
    
    query = (
        select(
            received_drugs.c.cd_id.label("cd_id"),
            received_drugs.c.packs_received.label("packs_received"),
            received_drugs.c.units_received.label("units_received"),
            spent_drugs.c.packs_spent.label("packs_spent"),
            spent_drugs.c.units_spent.label("units_spent"),
            (received_drugs.c.packs_received - func.coalesce(spent_drugs.c.packs_spent, 0))
            .cast(Integer).label("packs_rest")
        )
        .join(spent_drugs, spent_drugs.c.cd_id == received_drugs.c.cd_id, isouter=True)
        .subquery("catalog_drugs_received_and_spent_before_date_start")
    )
    
    return query

async def catalog_drug_rest_before_date_start(session: AsyncSession, body: DateRangeIn) -> Subquery:
    catalog_drugs_movement = await catalog_drugs_received_and_spent_before_date_start(session=session, body=body)
    c_d_info = await catalog_drug_info()
    
    query = (
        select(
            c_d_info.c.cd_id.label("cd_id"),
            c_d_info.c.packing,
            catalog_drugs_movement.c.packs_received,
            catalog_drugs_movement.c.units_received,
            catalog_drugs_movement.c.packs_spent,
            catalog_drugs_movement.c.units_spent,
            ((c_d_info.c.packing * func.coalesce(catalog_drugs_movement.c.packs_spent, 0)) - func.coalesce(catalog_drugs_movement.c.units_spent, 0))
            .cast(Float),
            catalog_drugs_movement.c.packs_rest.label("packs_rest"),
            (c_d_info.c.packing * catalog_drugs_movement.c.packs_rest)
            .cast(Float).label("units_rest")   
        )
        .join(catalog_drugs_movement, catalog_drugs_movement.c.cd_id == c_d_info.c.cd_id)
        .subquery("catalog_drug_rest_before_date_start")
    )
    return query


# catalog_drugs amount between date_range
async def catalog_drugs_received_and_spent_between_date_range(session: AsyncSession, body: DateRangeIn) -> Subquery:
    received_drugs = await catalog_drugs_received_between_date_range(session=session, body=body)
    spent_drugs = await catalog_drugs_spent_between_date_range(session=session, body=body)
    
    query = (
        select(
            received_drugs.c.cd_id.label("cd_id"),
            received_drugs.c.packs_received.label("packs_received"),
            received_drugs.c.units_received.label("units_received"),
            spent_drugs.c.packs_spent.label("packs_spent"),
            spent_drugs.c.units_spent.label("units_spent"),
            (received_drugs.c.packs_received - func.coalesce(spent_drugs.c.packs_spent, 0))
            .cast(Integer).label("packs_rest")
        )
        .join(spent_drugs, spent_drugs.c.cd_id == received_drugs.c.cd_id, isouter=True)
        .subquery("catalog_drugs_received_and_spent_between_date_range")
    )
    
    return query

# main query
async def catalog_drug_movement_between_date_range(session: AsyncSession, body: DateRangeIn) -> Subquery:
    c_d_rest_start = await catalog_drug_rest_before_date_start(session=session, body=body)
    c_d_movement = await catalog_drugs_received_and_spent_between_date_range(session=session, body=body)
    
    query = (
        select(
            c_d_movement.c.cd_id.label("cd_id"),
            c_d_rest_start.c.packs_rest.label("packs_rest_start"),
            c_d_rest_start.c.units_rest.label("units_rest_start"),
            c_d_movement.c.packs_received.label("packs_received"),
            c_d_movement.c.units_received.label("units_received"),
            c_d_movement.c.packs_spent.label("packs_spent"),
            c_d_movement.c.units_spent.label("units_spent"),
            (func.coalesce(c_d_rest_start.c.packs_rest, 0) + c_d_movement.c.packs_received - func.coalesce(c_d_movement.c.packs_spent, 0))
            .cast(Integer).label("packs_rest_end") 
        )
        .join(c_d_rest_start, c_d_rest_start.c.cd_id == c_d_movement.c.cd_id, isouter=True)
        .subquery("catalog_drug_movement_between_date_range")
    )
    return query

async def catalog_drug_movement_report(session: AsyncSession, body: DateRangeIn) -> list[tuple]:
    c_d_movement = await catalog_drug_movement_between_date_range(session=session, body=body)
    c_d_info = await catalog_drug_info()
    
    stmt = (
        select(
            c_d_info.c.cd_id.label("cd_id"),
            c_d_info.c.drug_name.label("drug_name"),
            c_d_info.c.batch.label("batch"),
            c_d_info.c.control.label("control"),
            c_d_info.c.production_date.label("production_date"),
            c_d_info.c.expiration_date.label("expiration_date"),
            c_d_info.c.packing.label("packing"),
            c_d_movement.c.packs_rest_start.label("packs_rest_start"),
            c_d_movement.c.units_rest_start.label("units_rest_start"),
            c_d_movement.c.packs_received.label("packs_received"),
            c_d_movement.c.units_received.label("units_received"),
            c_d_movement.c.packs_spent.label("packs_spent"),
            c_d_movement.c.units_spent.label("units_spent"),
            ((c_d_info.c.packing * func.coalesce(c_d_movement.c.packs_spent, 0)) - func.coalesce(c_d_movement.c.units_spent, 0)).cast(Float).label("disposed_units"),
            c_d_movement.c.packs_rest_end.label("packs_rest_end"),
            (c_d_info.c.packing * c_d_movement.c.packs_rest_end).cast(Float).label("units_rest_end")
            
        )
        .join(c_d_movement, c_d_movement.c.cd_id == c_d_info.c.cd_id)
    )
    
    return list(await session.execute(stmt))


async def report_1B(session: AsyncSession, body: DateRangeIn) -> list[tuple]:
    c_d_movement = await catalog_drug_movement_between_date_range(session=session, body=body)
    c_d_info = await catalog_drug_info()
    animals_count = await animals_count_catalog_drug_id(session=session, body=body)
    
    stmt = (
        select(
            c_d_info.c.cd_id.label("cd_id"),
            c_d_info.c.drug_name.label("drug_name"),
            c_d_info.c.batch.label("batch"),
            c_d_info.c.expiration_date.label("expiration_date"),
            c_d_info.c.packing.label("packing"),
            c_d_movement.c.packs_rest_start.label("packs_rest_start"),
            c_d_movement.c.units_rest_start.label("units_rest_start"),
            c_d_movement.c.packs_received.label("packs_received"),
            c_d_movement.c.units_received.label("units_received"),
            c_d_movement.c.packs_spent.label("packs_spent"),
            c_d_movement.c.units_spent.label("units_spent"),
            animals_count.c.animals_count.label("animals_count"),
            ((c_d_info.c.packing * func.coalesce(c_d_movement.c.packs_spent, 0)) - func.coalesce(c_d_movement.c.units_spent, 0)).cast(Float).label("disposed_units"),
            c_d_movement.c.packs_rest_end.label("packs_rest_end"),
            (c_d_info.c.packing * c_d_movement.c.packs_rest_end).cast(Float).label("units_rest_end")
            
        )
        .join(c_d_movement, c_d_movement.c.cd_id == c_d_info.c.cd_id)
        .join(animals_count, animals_count.c.cd_id == c_d_info.c.cd_id, isouter=True)
    )
    
    return list(await session.execute(stmt))











