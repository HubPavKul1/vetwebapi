from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.core.database import db_manager


from . import crud
from .schemas import DrugReportItemSchema, DrugReportSchema, DateRangeIn
from .serializers import serialize_drug_in_report

router = APIRouter(prefix="/reports")


@router.post("/drugs_movement", response_model=DrugReportSchema)
async def get_drugs_report(
    body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugReportSchema, dict]:
    try:
        drugs: list[tuple] = await crud.catalog_drug_movement_report(session=session, body=body)
        drug_schema: list[DrugReportItemSchema] = [await serialize_drug_in_report(item=drug) for drug in drugs]
        return DrugReportSchema(drugs_report=drug_schema)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
        
        
@router.post("/1vet_B", response_model=SuccessMessage)
async def get_drugs_report(
    body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[SuccessMessage, dict]:
    try:
        drugs: list[tuple] = await crud.animals_count_in_vetworks_between_date_range(session=session, body=body)
        print("*" *20)
        print(drugs)
        print("*" *20)
        # drug_schema: list[DrugReportItemSchema] = [await serialize_drug_in_report(item=drug) for drug in drugs]
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )