from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.company.schemas import SuccessMessage
from api_v1.dependencies import get_pagination_params
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
    # response: Response,
    pagination: dict = Depends(get_pagination_params),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Catalog, dict]:
    page = pagination["page"]
    per_page = pagination["per_page"]

    # Calculate the start and end indices for slicing the items list
    start = (page - 1) * per_page
    end = start + per_page
    try:
        drugs = await crud.read_catalog(session=session)

        # Send some extra information in the response headers
        # so the client can retrieve it as needed
        # response.headers["x-total-count"] = str(len(drugs))
        # response.headers["x-page"] = str(page)
        # response.headers["x-per-page"] = str(per_page)

        drug_schemas = [await serialize_catalog_drug(drug) for drug in drugs[start:end]]
        return Catalog(
            catalog_drugs=drug_schemas, total_count=len(drugs), page=page, per_page=per_page
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/overdue", response_model=SuccessMessage)
async def get_drugs_overdue(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    try:
        await crud.change_drug_activity(session=session)
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
