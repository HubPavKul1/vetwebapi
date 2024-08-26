from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.company.schemas import SuccessMessage
from core.database import db_manager
from core.models import CatalogDrug

from . import crud
from .dependencies import catalog_drug_by_id
from .schemas import Catalog, CatalogDrugIn, CatalogDrugSchema
from .serializers import serialize_catalog_drug

router = APIRouter(prefix="/catalog")


@router.post("/", response_model=CatalogDrugSchema, status_code=status.HTTP_201_CREATED)
async def create_catalog_drug(
    body: CatalogDrugIn, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> CatalogDrugSchema:
    catalog_drug = await crud.create_catalog_drug(session=session, body=body)
    return await serialize_catalog_drug(catalog_drug)


@router.get("/", response_model=Catalog)
async def get_catalog_drugs(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Catalog, dict]:
    try:
        drugs = await crud.read_catalog(session=session)
        drug_schemas = [await serialize_catalog_drug(drug) for drug in drugs]
        return Catalog(catalog_drugs=drug_schemas)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/overdue", response_model=SuccessMessage)
async def get_drugs_overdue(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    try:
        await crud.change_drug_activity(session=session)
        # drug_schemas = [await serialize_catalog_drug(drug) for drug in drugs]
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/{id}/", response_model=CatalogDrugSchema)
async def get_catalog_drug_route(
    drug: CatalogDrug = Depends(catalog_drug_by_id),
) -> Union[CatalogDrugSchema, dict]:
    try:
        return await serialize_catalog_drug(drug=drug)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.delete("/{id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def delete_catalog_drug(
    drug: CatalogDrug = Depends(catalog_drug_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_catalog_drug(session=session, drug=drug)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
