from typing import Union

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.api_v1.drug.dependencies import drug_by_id
from vetwebapi.api_v1.drug.schemas import (
    AccountingUnits,
    Budgets,
    DrugIn,
    DrugManufacturers,
    DrugNames,
    Drugs,
    DrugSchema,
)
from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Drug

from . import crud
from .catalog.views import router as catalog_router
from .receipts.views import router as receipt_router
from .serializers import serialize_drug, serialize_drug_card, serialize_drug_name

router = APIRouter(prefix="/drugs", tags=["Drugs"])
router.include_router(receipt_router)
router.include_router(catalog_router)


@router.post("/", response_model=DrugSchema, status_code=status.HTTP_201_CREATED)
async def create_drug_route(
    body: DrugIn, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> DrugSchema:
    drug = await crud.create_drug(session=session, body=body)

    return await serialize_drug(drug=drug)


@router.post("/{drug_id}/upload/", status_code=status.HTTP_201_CREATED)
async def upload_drug_file_route(
    file: UploadFile,
    drug: Drug = Depends(drug_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    if file.content_type not in ["application/pdf", "image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Invalid file type")
    await crud.save_file(session=session, drug=drug, file=file)


@router.get("/", response_model=Drugs)
async def get_drugs_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Drugs, dict]:
    try:
        drugs = await crud.read_drugs_with_options(session=session)
        drug_schemas = [await serialize_drug_card(drug) for drug in drugs]
        return Drugs(drugs=drug_schemas)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/{drug_id}/", response_model=DrugSchema)
async def get_drug_route(drug: Drug = Depends(drug_by_id)) -> Union[DrugSchema, dict]:
    try:
        return await serialize_drug(drug=drug)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.delete("/{drug_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def delete_drug_route(
    drug: Drug = Depends(drug_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_drug(session=session, drug=drug)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


# Get data for add drug form
@router.get("/budgets", response_model=Budgets)
async def get_budgets_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Budgets, dict]:
    try:
        budgets = await crud.read_budgets(session=session)
        return Budgets(budgets=budgets)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/drug_manufacturers", response_model=DrugManufacturers)
async def get_drug_manufacturers_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugManufacturers, dict]:
    try:
        drug_manufacturers = await crud.read_drug_manufacturers(session=session)
        return DrugManufacturers(drug_manufacturers=drug_manufacturers)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/accounting_units", response_model=AccountingUnits)
async def get_accounting_units_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[AccountingUnits, dict]:
    try:
        accounting_units = await crud.read_accounting_units(session=session)
        return AccountingUnits(accounting_units=accounting_units)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/drug_names", response_model=DrugNames)
async def get_drug_names_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[AccountingUnits, dict]:
    try:
        drugs = await crud.read_drugs(session=session)
        drug_schemas = [await serialize_drug_name(drug) for drug in drugs]
        return DrugNames(drugs=drug_schemas)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
