from typing import Any

from sqlalchemy import Row

from .schemas import DiagnosticReportItemSchema, VetWorkReportSchema, CompanyVetWork, CompanyVetWorks


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
            work_type=row[3], 
            disease=row[4],
            animals_count=row[5]
            ) 


async def serialize_company_vetworks(vetworks: list[Row[Any]]):
    return [await serialize_company_vetwork(row) for row in vetworks]

        
