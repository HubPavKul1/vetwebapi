from datetime import date, datetime
from typing import Any, Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import Result, Row
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.drug.catalog.dependencies import catalog_drug_by_id
from api_v1.schemas import DateRangeIn
from core.database import db_manager
from core.models import CatalogDrug

from . import crud
from .schemas import (
    DrugReportItemSchema,
    DrugReportSchema,
    DrugRestSchema,
    Report1VetBItemSchema,
    Report1VetBSchema,
)
from .serializers import serialize_drug_in_report, serialize_drug_in_report_1B

router = APIRouter(prefix="/reports")


@router.get("/drugs_movement", response_model=DrugReportSchema)
async def get_drugs_report(
    date_start: date,
    date_end: date,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugReportSchema, dict]:
    body = DateRangeIn(date_start=date_start, date_end=date_end)
    try:
        drugs: Result[Any] = await crud.catalog_drugs_movement_report(
            session=session, body=body
        )
        drug_schema: list[DrugReportItemSchema] = [
            await serialize_drug_in_report(item=drug) for drug in drugs
        ]
        return DrugReportSchema(drugs_report=drug_schema)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/drugs_movement/{id}", response_model=DrugRestSchema)
async def get_drug_rests(
    drug: CatalogDrug = Depends(catalog_drug_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugRestSchema, dict]:
    curDate = datetime.today().date()
    body = DateRangeIn(date_start=curDate, date_end=curDate)
    try:
        drug_rest: Row[Any] = await crud.catalog_drug_rest(
            session=session, body=body, drug_id=drug.id
        )
        return DrugRestSchema(
            id=drug_rest[0], accounting_unit=drug_rest[9], packs_rest=drug_rest[7], units_rest=drug_rest[8]
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/1vet_B", response_model=Report1VetBSchema)
async def vet_1B_report(
    date_start: date,
    date_end: date,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Report1VetBSchema, dict]:
    body = DateRangeIn(date_start=date_start, date_end=date_end)
    try:
        drugs: Result[Any] = await crud.report_1B(session=session, body=body)
        drug_schema: list[Report1VetBItemSchema] = [
            await serialize_drug_in_report_1B(session=session, item=drug)
            for drug in drugs
        ]
        return Report1VetBSchema(vet1B_report=drug_schema)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
