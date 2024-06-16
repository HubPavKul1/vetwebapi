from sqlalchemy import desc, select, func, cast, Integer, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload
# from operator import and_, or_
from datetime import date

from vetwebapi.core.models import DrugInMovement, DrugMovement, Operation

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
        select(DrugInMovement.catalog_drug_id, func.sum(DrugInMovement.packs_amount).label("sum_packs"), func.sum(DrugInMovement.units_amount).label("sum_units"))
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


async def read_receipts_by_date_grouped_by_drug_id(session: AsyncSession, body: DateRangeIn) -> list[DrugMovement]:
    date_start = body.date_start
    date_end = body.date_end

    stmt = (
        select(
            DrugMovement.id, 
            DrugMovement.operation_date, 
            cast(func.sum(DrugInMovement.packs_amount), Integer), 
            cast(func.sum(DrugInMovement.units_amount), Integer)
            )
        .options(selectinload(DrugMovement.catalog_drugs_details)
        .joinedload(DrugInMovement.catalog_drug)
        )
        .filter(and_(DrugMovement.operation_id == 1, DrugMovement.operation_date.between(date_start, date_end)))
        .group_by(
            DrugInMovement.catalog_drug_id
        )
        )
    
    return list(await session.scalars(stmt))


# Delete
async def delete_drug_movement(session: AsyncSession, drug_movement: DrugMovement) -> None:
    await session.delete(drug_movement)
    await session.commit()
