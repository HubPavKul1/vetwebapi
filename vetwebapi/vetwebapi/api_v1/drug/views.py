from pathlib import Path
from typing import Union

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.dependencies import get_pagination_params
from api_v1.drug.dependencies import drug_by_id
from api_v1.drug.schemas import (
    AccountingUnits,
    AdministrationMethods,
    Budgets,
    DisposalMethods,
    Dosages,
    DrugIn,
    DrugManufacturers,
    DrugNames,
    Drugs,
    DrugSchema,
    PlacesOfAdministration,
)
from api_v1.schemas import SuccessMessage
from core.database import db_manager
from core.models import Drug

from . import crud
from .catalog.views import router as catalog_router
from .receipts.views import router as receipt_router
from .reports.views import router as report_router
from .serializers import serialize_drug, serialize_drug_card, serialize_drug_name

router = APIRouter(prefix="/drugs", tags=["Drugs"])
router.include_router(receipt_router)
router.include_router(catalog_router)
router.include_router(report_router)


@router.post("", response_model=DrugSchema, status_code=status.HTTP_201_CREATED)
async def create_drug_route(
    body: DrugIn, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> DrugSchema:
    drug = await crud.create_drug(session=session, body=body)

    return await serialize_drug(drug=drug)


@router.post("/{drug_id}/upload", status_code=status.HTTP_201_CREATED)
async def upload_drug_file_route(
    file: UploadFile,
    drug: Drug = Depends(drug_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    if file.content_type not in [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
    ]:
        raise HTTPException(status_code=400, detail="Invalid file type")
    await crud.save_file(session=session, drug=drug, file=file)


@router.get("", response_model=Drugs)
async def get_drugs_route(
    pagination: dict = Depends(get_pagination_params),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Drugs, dict]:
    page = pagination["page"]
    per_page = pagination["per_page"]

    # Calculate the start and end indices for slicing the items list
    start = (page - 1) * per_page
    end = start + per_page
    try:
        drugs = await crud.read_drugs_with_options(session=session)
        drug_schemas = [await serialize_drug_card(drug) for drug in drugs[start:end]]
        return Drugs(
            drugs=drug_schemas, total_count=len(drugs), page=page, per_page=per_page
        )
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


@router.get("/{drug_id}/image")
async def get_drug_image(drug: Drug = Depends(drug_by_id)):
    image_path = Path(f"media/{drug.image}")
    if not image_path.is_file():
        return {"error": "Image not found on the server"}
    return FileResponse(image_path)


@router.get("/{drug_id}/instruction")
async def get_drug_instruction(drug: Drug = Depends(drug_by_id)):
    file_path = Path(f"media/{drug.instruction}")
    if not file_path.is_file():
        return {"error": "Image not found on the server"}
    return FileResponse(file_path)


@router.delete(
    "/{drug_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED
)
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


@router.get("/disposal_methods", response_model=DisposalMethods)
async def get_disposal_methods_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DisposalMethods, dict]:
    try:
        disposal_methods = await crud.read_disposal_methods(session=session)
        return DisposalMethods(disposal_methods=disposal_methods)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/dosages", response_model=Dosages)
async def get_dosages_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Dosages, dict]:
    try:
        dosages = await crud.read_dosages(session=session)
        return Dosages(dosages=dosages)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/places_of_administration", response_model=PlacesOfAdministration)
async def get_places_of_administration_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[PlacesOfAdministration, dict]:
    try:
        places_of_administration = await crud.read_places_of_administration(
            session=session
        )
        return PlacesOfAdministration(places_of_administration=places_of_administration)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/administration_methods", response_model=AdministrationMethods)
async def get_administration_methods_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[AdministrationMethods, dict]:
    try:
        administration_methods = await crud.read_administration_methods(session=session)
        return AdministrationMethods(administration_methods=administration_methods)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/drug_names", response_model=DrugNames)
async def get_drug_names_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugNames, dict]:
    try:
        drugs = await crud.read_drugs(session=session)
        drug_schemas = [await serialize_drug_name(drug) for drug in drugs]
        return DrugNames(drugs=drug_schemas)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
