from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.core.database import db_manager


from . import crud
from .schemas import DateRangeIn, DiagnosticReportItemSchema, DiagnosticReport, VetWorkReport, VetWorkReportSchema
from .serializers import serialize_diagnostic, serialize_vetwork


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
    
@router.post("/diagnostics", response_model=DiagnosticReport)
async def get_diagnostic_report(
    body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DiagnosticReport, dict]:
    try:
        report: list[tuple] = await crud.diagnostic_report(session=session, body=body)
        report_schema: list[DiagnosticReportItemSchema] = [await serialize_diagnostic(item=elem) for elem in report]
        return DiagnosticReport(report=report_schema)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    

@router.post("/vaccinations", response_model=VetWorkReport)
async def get_vaccination_report(
    body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VetWorkReport, dict]:
    try:
        report: list[tuple] = await crud.vaccination_report(session=session, body=body)
        report_schema: list[VetWorkReportSchema] = [await serialize_vetwork(item=elem) for elem in report]
        return VetWorkReport(report=report_schema)
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
