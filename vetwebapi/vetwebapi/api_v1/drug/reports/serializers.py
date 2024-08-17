from .schemas import DrugReportItemSchema, Report1VetBItemSchema
from sqlalchemy.ext.asyncio import AsyncSession
from .crud import drug_diseases


async def serialize_drug_in_report(item: tuple) -> DrugReportItemSchema:
    return DrugReportItemSchema(
        id=item[0],
        drug_name=item[1],
        batch=item[2],
        control=item[3],
        production_date=item[4],
        expiration_date=item[5],
        packing=item[6],
        packs_start=item[7],
        units_start=item[8],
        packs_received=item[9],
        units_received=item[10],
        packs_spent=item[11],
        units_spent=item[12],
        disposed_units=item[13],
        units_spent_disposed=item[14],
        packs_rest=item[15],
        units_rest=item[16],
    )


async def serialize_drug_in_report_1B(session: AsyncSession, item: tuple) -> Report1VetBItemSchema:
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
    )
