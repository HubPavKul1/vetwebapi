from datetime import date
from typing import Any, Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import Result
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.schemas import DateRangeIn
from core.database import db_manager

from . import crud
from .schemas import (
    DiagnosticReport,
    DiagnosticReportItemSchema,
    VetWorkReport,
    VetWorkReportSchema,
    CompanyVetWorks,
)
from .serializers import (
    serialize_diagnostic,
    serialize_vetwork,
    serialize_company_vetworks,
)

router = APIRouter(prefix="/reports")


@router.get("/diagnostics", response_model=DiagnosticReport)
async def get_diagnostic_report(
    date_start: date,
    date_end: date,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DiagnosticReport, dict]:
    body = DateRangeIn(date_start=date_start, date_end=date_end)
    try:
        report: Result[Any] = await crud.diagnostic_report(session=session, body=body)
        report_schema: list[DiagnosticReportItemSchema] = [
            await serialize_diagnostic(item=elem) for elem in report
        ]
        return DiagnosticReport(diagnostics=report_schema)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/vaccinations", response_model=VetWorkReport)
async def get_vaccination_report(
    date_start: date,
    date_end: date,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VetWorkReport, dict]:
    body = DateRangeIn(date_start=date_start, date_end=date_end)
    try:
        report: Result[Any] = await crud.vaccination_treatment_report(
            session=session, body=body
        )
        report_schema: list[VetWorkReportSchema] = [
            await serialize_vetwork(item=elem) for elem in report
        ]
        return VetWorkReport(vaccinations=report_schema)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/vetworks", response_model=CompanyVetWorks)
async def get_company_vetworks_by_date_range(
    date_start: date,
    date_end: date,
    company_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CompanyVetWorks, dict]:

    body = DateRangeIn(date_start=date_start, date_end=date_end)
    try:
        report: Result[Any] = await crud.get_company_vetworks_by_date_range(
            session=session, body=body, company_id=company_id
        )

        report_schema = await serialize_company_vetworks(report)
        return CompanyVetWorks(vetworks=report_schema)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
