from sqlalchemy import desc, select, func, cast, Integer, and_, Float, Subquery
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload
# from operator import and_, or_
from datetime import date

from vetwebapi.core.models import DrugInMovement, DrugMovement, Operation, Drug, CatalogDrug

from .schemas import DrugInMovementIn, DrugMovementIn, DateRangeIn


# Create
async def create_receipt(session: AsyncSession, body: DrugMovementIn) -> DrugMovement:
    new_drug_movement = DrugMovement(**body.model_dump())
    new_drug_movement.operation_id = 1
    session.add(new_drug_movement)
    await session.commit()
    await session.refresh(new_drug_movement)
    return new_drug_movement


async def add_drug_to_movement(
    session: AsyncSession, body: DrugInMovementIn, drug_movement_id: int
) -> DrugInMovement:
    
    new_drug = DrugInMovement(**body.model_dump())
    new_drug.drug_movement_id = drug_movement_id
    session.add(new_drug)
    await session.commit()
    return new_drug
    


# Read
async def read_operation_by_id(session: AsyncSession, operation_id: int) -> Operation | None:
    return await session.get(Operation, operation_id)


async def read_drug_movement_by_id(
    session: AsyncSession, drug_movement_id: int
) -> DrugMovement | None:
    return await session.get(DrugMovement, drug_movement_id)


async def read_receipts(session: AsyncSession) -> list[DrugMovement]:
    stmt = (
        select(DrugMovement)
        .where(DrugMovement.operation_id == 1)
        .order_by(desc(DrugMovement.operation_date))
    )
    return list(await session.scalars(stmt))

async def read_receipts_with_drugs(session: AsyncSession) -> list[DrugMovement]:
    stmt = (
        select(DrugMovement)
        .options(selectinload(DrugMovement.catalog_drugs_details)
        .joinedload(DrugInMovement.catalog_drug
        ))
        .where(DrugMovement.operation_id == 1)
        .order_by(desc(DrugMovement.operation_date))
    )
    
    return list(await session.scalars(stmt))


async def read_drugs_in_drug_movement(session: AsyncSession, drug_movement: DrugInMovement) -> list[DrugInMovement]:
    stmt = (
        select(DrugInMovement)
        .options(joinedload(DrugInMovement.catalog_drug)
        )
        .where(DrugInMovement.drug_movement_id == drug_movement.id)
    
    )
    
    return list(await session.scalars(stmt))


"""
1) Приход и Расход:

SELECT * ,
SUM(dim.packs_amount) OVER(PARTITION BY dm.id) AS sum_packs,
SUM(dim.units_amount) OVER(PARTITION BY dm.id) AS sum_units
FROM catalog_drugs c_d
JOIN drugs_in_movement dim ON dim.catalog_drug_id = c_d.id
JOIN drug_movements dm ON dm.id = dim.drug_movement_id;

2) Приход:

SELECT * ,
SUM(dim.packs_amount) OVER(PARTITION BY dm.id) AS sum_packs,
SUM(dim.units_amount) OVER(PARTITION BY dm.id) AS sum_units
FROM catalog_drugs c_d
JOIN drugs_in_movement dim ON dim.catalog_drug_id = c_d.id
JOIN drug_movements dm ON dm.id = dim.drug_movement_id
WHERE dm.operation_id = 1;

3) Расход:

SELECT * ,
SUM(dim.packs_amount) OVER(PARTITION BY dm.id) AS sum_packs,
SUM(dim.units_amount) OVER(PARTITION BY dm.id) AS sum_units
FROM catalog_drugs c_d
JOIN drugs_in_movement dim ON dim.catalog_drug_id = c_d.id
JOIN drug_movements dm ON dm.id = dim.drug_movement_id
WHERE dm.operation_id = 2;

4) 
SELECT 
d.name, 
c_d.batch, 
c_d.production_date, 
c_d.expiration_date,
dm.id,
o.name,
dm.operation_date,
dim.packs_amount,
dim.units_amount,
SUM(dim.packs_amount) OVER(PARTITION BY dm.id) AS sum_packs,
SUM(dim.units_amount) OVER(PARTITION BY dm.id) AS sum_units
FROM catalog_drugs c_d
JOIN drugs d ON d.id = c_d.drug_id
JOIN drugs_in_movement dim ON dim.catalog_drug_id = c_d.id
JOIN drug_movements dm ON dm.id = dim.drug_movement_id
JOIN operations o ON o.id = dm.operation_id;


5)
SELECT
d.name as drug_name,
cd.batch,
dm.operation_id,
o.name as operation_name,
SUM(dim.packs_amount) AS sum_packs_receipt,
SUM(dim.units_amount) AS sum_units_receipt,

spent_drugs.sum_packs_spent AS packs_spent,
spent_drugs.sum_units_spent AS units_spent

FROM catalog_drugs cd
JOIN drugs d ON d.id = cd.drug_id
JOIN drugs_in_movement dim ON dim.catalog_drug_id = cd.id
JOIN drug_movements dm ON dm.id = dim.drug_movement_id
JOIN operations o ON o.id = dm.operation_id
LEFT OUTER JOIN (
SELECT
cd.id AS catalog_drug_id,
SUM(dim.packs_amount) AS sum_packs_spent,
SUM(dim.units_amount) AS sum_units_spent
FROM catalog_drugs cd
JOIN drugs_in_movement dim ON dim.catalog_drug_id = cd.id
JOIN drug_movements dm ON dm.id = dim.drug_movement_id
JOIN operations o ON o.id = dm.operation_id
WHERE o.id = 2
GROUP BY(cd.id, dm.operation_id)
) spent_drugs ON spent_drugs.catalog_drug_id = cd.id
WHERE o.id = 1
GROUP BY(
drug_name, 
cd.batch, 
cd.id, 
dm.operation_id, 
operation_name,
spent_drugs.sum_packs_spent,
spent_drugs.sum_units_spent
);

6) Весь запрос:
SELECT *,
sum_packs_receipt - COALESCE(packs_spent, 0) AS packs_rest,
sum_units_receipt - COALESCE(units_spent, 0) AS units_rest
FROM
(SELECT
d.name as drug_name,
cd.batch,
dm.operation_id,
o.name as operation_name,
SUM(dim.packs_amount) AS sum_packs_receipt,
SUM(dim.units_amount) AS sum_units_receipt,
spent_drugs.sum_packs_spent AS packs_spent,
spent_drugs.sum_units_spent AS units_spent

FROM catalog_drugs cd
JOIN drugs d ON d.id = cd.drug_id
JOIN drugs_in_movement dim ON dim.catalog_drug_id = cd.id
JOIN drug_movements dm ON dm.id = dim.drug_movement_id
JOIN operations o ON o.id = dm.operation_id
LEFT OUTER JOIN (
SELECT
cd.id AS catalog_drug_id,
SUM(dim.packs_amount) AS sum_packs_spent,
SUM(dim.units_amount) AS sum_units_spent
FROM catalog_drugs cd
JOIN drugs_in_movement dim ON dim.catalog_drug_id = cd.id
JOIN drug_movements dm ON dm.id = dim.drug_movement_id
JOIN operations o ON o.id = dm.operation_id
WHERE o.id = 2
GROUP BY(cd.id, dm.operation_id)
) spent_drugs ON spent_drugs.catalog_drug_id = cd.id
WHERE o.id = 1
GROUP BY(
drug_name, 
cd.batch, 
cd.id, 
dm.operation_id, 
operation_name,
spent_drugs.sum_packs_spent,
spent_drugs.sum_units_spent
)) sub_query;
"""

async def read_drugs_in_receipt_grouped_by_catalog_drug_id(session: AsyncSession) -> list[DrugInMovement]:
    stmt = (
        select(
            DrugInMovement.catalog_drug_id, 
            func.sum(DrugInMovement.packs_amount).label("sum_packs"), 
            func.sum(DrugInMovement.units_amount).label("sum_units"))
        # .options(selectinload(DrugInMovement.catalog_drug))
        # .options(selectinload(DrugInMovement.drug_movement))
        .group_by(DrugInMovement.catalog_drug_id)
    )

    res = list(await session.scalars(stmt))
    # [print(item.sum_packs, item.sum_units) for item in res]
    print(type(res[0]))

    return res


async def read_receipts_by_date(session: AsyncSession, body: DateRangeIn) -> list[DrugMovement]:
    date_start = body.date_start
    date_end = body.date_end

    stmt = (
        select(DrugMovement)
        .options(selectinload(DrugMovement.catalog_drugs_details)
        .joinedload(DrugInMovement.catalog_drug
        ))
        .where(
            and_(
                DrugMovement.operation_id == 1, 
                DrugMovement.operation_date.between(date_start, date_end)
                )
            )
        .order_by(
            desc(DrugMovement.operation_date)
        )
        )
    
    return list(await session.scalars(stmt))


async def read_receipts_ids_by_date(session: AsyncSession, body: DateRangeIn) -> list[int]:
    date_start = body.date_start
    date_end = body.date_end

    stmt = (
        select(
            DrugMovement.id
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


async def read_drug_spent_ids_by_date(session: AsyncSession, body: DateRangeIn) -> list[int]:
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


async def read_drugs_in_receipts_by_date(session: AsyncSession, body: DateRangeIn) -> list[tuple]:
    
    receipt_ids = await read_receipts_ids_by_date(session=session, body=body)

    stmt = (
        select(
            DrugInMovement.catalog_drug_id,
            func.sum(DrugInMovement.packs_amount).label("sum_packs_receipts"),
            func.sum(DrugInMovement.units_amount).label("sum_units_receipts")
            )
        .filter(DrugInMovement.drug_movement_id.in_(receipt_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        )
    
    return list(await session.execute(stmt)) # [(1, 60, 120.0), (2, 3, 150.0)]


async def read_spent_drugs_by_date(session: AsyncSession, body: DateRangeIn) -> list[tuple]:
    
    spent_ids = await read_drug_spent_ids_by_date(session=session, body=body)

    stmt = (
        select(
            DrugInMovement.catalog_drug_id,
            func.sum(DrugInMovement.packs_amount).label("sum_packs_receipts"),
            func.sum(DrugInMovement.units_amount).label("sum_units_receipts")
            )
        .filter(DrugInMovement.drug_movement_id.in_(spent_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        )
    
    return list(await session.execute(stmt))


async def read_drug_movement_report_by_date_range(session: AsyncSession, body: DateRangeIn) -> list[tuple]:

    receipt_ids = await read_receipts_ids_by_date(session=session, body=body)
    # receipt_ids = await read_receipts_ids_before_date_start(session=session, body=body)
    spent_ids = await read_drug_spent_ids_by_date(session=session, body=body)
    # spent_ids = await read_drug_spent_ids_before_date_start(session=session, body=body)

    # get drugs amount in receipt in date range
    subq_1 = (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("sum_packs_rec"),
            func.sum(DrugInMovement.units_amount).label("sum_units_rec")
            )
        .filter(DrugInMovement.drug_movement_id.in_(receipt_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("recept_drugs")  
    )

    # get drugs amount spent in date range
    subq_2 = (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("sum_packs_spent"),
            func.sum(DrugInMovement.units_amount).label("sum_units_spent")
            )
        .filter(DrugInMovement.drug_movement_id.in_(spent_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("spent_drugs")
        
    )

    # join prev tables
    subq_3 = (
        select(
            subq_1.c.cd_id.label("cd_id"),
            subq_1.c.sum_packs_rec.label("packs_rec"),
            subq_1.c.sum_units_rec.label("units_rec"),
            subq_2.c.sum_packs_spent.label("packs_spent"),
            subq_2.c.sum_units_spent.label("units_spent")
            
        )
        .join(subq_2, subq_2.c.cd_id == subq_1.c.cd_id, isouter=True)
        .subquery("drug_rec_spent")
    )
    
    subq_4 = await drug_movement_report_before_date(session=session, body=body)
    
    subq_5 = (
        select(
            subq_3.c.cd_id.label("cd_id"),
            subq_4.c.packs_rest.label("packs_rest_start"),
            subq_4.c.units_rest.label("units_rest_start"),
            subq_3.c.packs_rec.label("packs_rec"),
            subq_3.c.units_rec.label("units_rec"),
            subq_3.c.packs_spent.label("packs_spent"),
            subq_3.c.units_spent.label("units_spent"),
            (func.coalesce(subq_4.c.packs_rest, 0) + subq_3.c.packs_rec - func.coalesce(subq_3.c.packs_spent, 0))
            .cast(Integer).label("packs_rest_end") 
        )
        .join(subq_4, subq_4.c.cd_id == subq_3.c.cd_id, isouter=True)
        .subquery("drugs_movement")
    )
    
    # get catalog_drugs joined with drugs table
    subq_6 = (
        select(
            Drug.name.label("drug_name"),
            Drug.packing.label("packing"),
            CatalogDrug.id.label("cd_id"),
            CatalogDrug.batch.label("batch"),
            CatalogDrug.control.label("control"),
            CatalogDrug.production_date.label("production_date"),
            CatalogDrug.expiration_date.label("expiration_date"),
        )
        .select_from(CatalogDrug)
        .join(Drug, Drug.id == CatalogDrug.drug_id)
        .subquery("catalog_drug_info")
    )
    
    
    
    # get final report query
    query = (
        select(
            subq_6.c.cd_id,
            subq_6.c.drug_name,
            subq_6.c.batch,
            subq_6.c.control,
            subq_6.c.production_date,
            subq_6.c.expiration_date,
            subq_5.c.packs_rest_start,
            subq_5.c.units_rest_start,
            subq_5.c.packs_rec,
            subq_5.c.units_rec,
            subq_5.c.packs_spent,
            subq_5.c.units_spent,
            ((subq_6.c.packing * func.coalesce(subq_5.c.packs_spent, 0)) - func.coalesce(subq_5.c.units_spent, 0)).cast(Float),
            subq_5.c.packs_rest_end,
            (subq_6.c.packing * subq_5.c.packs_rest_end).cast(Float)
            
        )
        .join(subq_5, subq_5.c.cd_id == subq_6.c.cd_id)
    )
    
    return list(await session.execute(query))


async def drug_movement_report_before_date(session: AsyncSession, body: DateRangeIn) -> Subquery:

    receipt_ids = await read_receipts_ids_before_date_start(session=session, body=body)
    spent_ids = await read_drug_spent_ids_before_date_start(session=session, body=body)

    # get drugs amount in receipt in date range
    subq_1 = (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("sum_packs_rec"),
            func.sum(DrugInMovement.units_amount).label("sum_units_rec")
            )
        .filter(DrugInMovement.drug_movement_id.in_(receipt_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("recept_drugs")  
    )

    # get drugs amount spent in date range
    subq_2 = (
        select(
            DrugInMovement.catalog_drug_id.label("cd_id"),
            func.sum(DrugInMovement.packs_amount).label("sum_packs_spent"),
            func.sum(DrugInMovement.units_amount).label("sum_units_spent")
            )
        .filter(DrugInMovement.drug_movement_id.in_(spent_ids))
        .group_by(DrugInMovement.catalog_drug_id)
        .subquery("spent_drugs")
        
    )

    # join prev tables and calc rest drugs amount
    subq_3 = (
        select(
            subq_1.c.cd_id.label("cd_id"),
            subq_1.c.sum_packs_rec.label("packs_rec"),
            subq_1.c.sum_units_rec.label("units_rec"),
            subq_2.c.sum_packs_spent.label("packs_spent"),
            subq_2.c.sum_units_spent.label("units_spent"),
            (subq_1.c.sum_packs_rec - func.coalesce(subq_2.c.sum_packs_spent, 0))
            .cast(Integer).label("packs_rest")
        )
        .join(subq_2, subq_2.c.cd_id == subq_1.c.cd_id, isouter=True)
        .subquery("drug_rec_spent")
    )
    
    # get catalog_drugs joined with drugs table
    subq_4 = (
        select(
            Drug.name.label("drug_name"),
            Drug.packing.label("packing"),
            CatalogDrug.id.label("cd_id"),
            CatalogDrug.batch.label("batch"),
            CatalogDrug.control.label("control"),
            CatalogDrug.production_date.label("production_date"),
            CatalogDrug.expiration_date.label("expiration_date"),
        )
        # .select_from(CatalogDrug)
        .join(Drug, Drug.id == CatalogDrug.drug_id)
        .subquery("catalog_drug_info")
    )
    
    # get final report query
    query = (
        select(
            subq_4.c.cd_id.label("cd_id"),
            subq_4.c.drug_name,
            subq_4.c.batch,
            subq_4.c.control,
            subq_4.c.production_date,
            subq_4.c.expiration_date,
            subq_3.c.packs_rec,
            subq_3.c.units_rec,
            subq_3.c.packs_spent,
            subq_3.c.units_spent,
            ((subq_4.c.packing * func.coalesce(subq_3.c.packs_spent, 0)) - func.coalesce(subq_3.c.units_spent, 0)).cast(Float).label("disposed_units"),
            subq_3.c.packs_rest.label("packs_rest"),
            (subq_4.c.packing * subq_3.c.packs_rest).cast(Float).label("units_rest")
            
        )
        .join(subq_3, subq_3.c.cd_id == subq_4.c.cd_id)
        .subquery("drugs_rest_before")
    )
    
    # return list(await session.execute(query))
    return query
    
    
# Delete
async def delete_drug_movement(session: AsyncSession, drug_movement: DrugMovement) -> None:
    await session.delete(drug_movement)
    await session.commit()
