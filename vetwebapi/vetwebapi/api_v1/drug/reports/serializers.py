from typing import Any

from sqlalchemy import Row
from sqlalchemy.ext.asyncio import AsyncSession

from .crud import drug_diseases
from .schemas import DrugReportItemSchema, Report1VetBItemSchema


async def serialize_drug_in_report(item: Row[Any]) -> DrugReportItemSchema:
    return DrugReportItemSchema(
        id=item[0],
        drug_name=item[1],
        accounting_unit=item[2],
        batch=item[3],
        control=item[4],
        production_date=item[5],
        expiration_date=item[6],
        packing=item[7],
        packs_start=item[8],
        units_start=item[9],
        packs_received=item[10],
        units_received=item[11],
        packs_spent=item[12],
        units_spent=item[13],
        disposed_units=item[14],
        units_spent_disposed=item[15],
        packs_rest=item[16],
        units_rest=item[17],
    )


async def serialize_drug_in_report_1B(
    session: AsyncSession, item: Row[Any]
) -> Report1VetBItemSchema:
    diseases = await drug_diseases(session=session, drug_id=item[2])
    return Report1VetBItemSchema(
        id=item[0],
        diseases=diseases,
        drug_name=item[1],
        batch=item[3],
        packing=item[4],
        units_start=item[5],
        units_received=item[6],
        units_spent=item[7],
        animals_count=item[8],
        disposed_units=item[9],
        units_spent_disposed=item[10],
        units_rest=item[11],
        accounting_unit=item[12],
    )
