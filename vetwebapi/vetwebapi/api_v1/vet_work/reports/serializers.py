from typing import Any

from sqlalchemy import Row, Result

from .schemas import DiagnosticReportItemSchema, VetWorkReportSchema, CompanyVetWork


async def serialize_diagnostic(item: Row[Any]) -> DiagnosticReportItemSchema:
    return DiagnosticReportItemSchema(
        animal_group=item[0],
        disease=item[1],
        animal_count=item[2],
        positive_count=item[3],
    )


async def serialize_vetwork(item: Row[Any]) -> VetWorkReportSchema:
    return VetWorkReportSchema(
        animal_group=item[0], disease=item[1], animal_count=item[2]
    )


async def serialize_company_vetwork(row: Row[Any]):
    return CompanyVetWork(
        company=row[0],
        company_id=row[1],
        vetwork_date=row[2],
        vetwork_id=row[3],
        work_type=row[4],
        disease=row[5],
        animals_count=row[6],
    )


async def serialize_company_vetworks(vetworks: Result[Any]):
    return [await serialize_company_vetwork(row) for row in vetworks]
