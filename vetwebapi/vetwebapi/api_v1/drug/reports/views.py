from typing import Union
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.company.schemas import SuccessMessage
from api_v1.drug.catalog.dependencies import catalog_drug_by_id
from core.models import CatalogDrug
from core.database import db_manager


from . import crud
from .schemas import (
    DrugReportItemSchema,
    DrugReportSchema,
    DateRangeIn,
    Report1VetBSchema,
    Report1VetBItemSchema,
    DrugRestSchema,
)
from .serializers import serialize_drug_in_report, serialize_drug_in_report_1B

router = APIRouter(prefix="/reports")


@router.post("/drugs_movement", response_model=DrugReportSchema)
async def get_drugs_report(
    body: DateRangeIn, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> Union[DrugReportSchema, dict]:
    try:
        drugs: list[tuple] = await crud.catalog_drugs_movement_report(session=session, body=body)
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
        drug_rest: tuple = await crud.catalog_drug_rest(session=session, body=body, drug_id=drug.id)
        return DrugRestSchema(id=drug_rest[0], packs_rest=drug_rest[7], units_rest=drug_rest[8])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.post("/test", response_model=SuccessMessage)
async def get_drugs_report(
    body: DateRangeIn, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> Union[SuccessMessage, dict]:
    try:
        drugs: list[tuple] = await crud.report_1B(session=session, body=body)
        print("*" * 20)
        print(drugs)
        print("*" * 20)
        # drug_schema: list[DrugReportItemSchema] = [await serialize_drug_in_report(item=drug) for drug in drugs]
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.post("/1vet_B", response_model=Report1VetBSchema)
async def vet_1B_report(
    body: DateRangeIn, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> Union[Report1VetBSchema, dict]:
    try:
        drugs: list[tuple] = await crud.report_1B(session=session, body=body)
        drug_schema: list[Report1VetBItemSchema] = [
            await serialize_drug_in_report_1B(session=session, item=drug) for drug in drugs
        ]
        return Report1VetBSchema(vet1B_report=drug_schema)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
