from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.core.database import db_manager


from . import crud
from vetwebapi.api_v1.drug.reports.schemas import DateRangeIn


router = APIRouter(prefix="/reports")

        
@router.post("/test", response_model=SuccessMessage)
async def get_drugs_report(
    body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[SuccessMessage, dict]:
    try:
        animals: list[tuple] = await crud.diagnostic_report(session=session, body=body)
        print("*" *20)
        print(animals)
        print("*" *20)
        # drug_schema: list[DrugReportItemSchema] = [await serialize_drug_in_report(item=drug) for drug in drugs]
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )

@router.get("/test", response_model=SuccessMessage)
async def get_drugs_report(
    # body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[SuccessMessage, dict]:
    try:
        animals: list[tuple] = await crud.diseases_in_vetwork(session=session)
        print("*" *20)
        print(animals)
        print("*" *20)
        # drug_schema: list[DrugReportItemSchema] = [await serialize_drug_in_report(item=drug) for drug in drugs]
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
