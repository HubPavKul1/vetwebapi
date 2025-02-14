from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.dependencies import get_pagination_params
from api_v1.schemas import SuccessMessage
from core.database import db_manager
from core.models import DrugInMovement, DrugMovement

from . import crud
from .dependencies import drug_movement_by_id
from .schemas import (
    DrugInMovementIn,
    DrugInMovementSchema,
    DrugMovementDetail,
    DrugMovementIn,
    DrugMovementOut,
    DrugMovements,
)
from .serializers import serialize_drug_in_movement, serialize_drug_movement_card

router = APIRouter(prefix="/receipts")


@router.post("", response_model=DrugMovementOut, status_code=status.HTTP_201_CREATED)
async def create_receipt_route(
    body: DrugMovementIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    drug_movement = await crud.create_receipt(session=session, body=body)
    return DrugMovementOut(
        id=drug_movement.id,
        operation_date=drug_movement.operation_date,
        operation=drug_movement.operation.name,
    )


@router.post("/{drug_movement_id}/", status_code=status.HTTP_201_CREATED)
async def add_drug_to_movement_route(
    body: DrugInMovementIn,
    drug_movement_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    await crud.add_drug_to_movement(
        session=session, body=body, drug_movement_id=drug_movement_id
    )


@router.get("", response_model=DrugMovements)
async def get_receipts(
    pagination: dict = Depends(get_pagination_params),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugMovements, dict]:
    page = pagination["page"]
    per_page = pagination["per_page"]

    # Calculate the start and end indices for slicing the items list
    start = (page - 1) * per_page
    end = start + per_page
    try:
        receipts: list[DrugMovement] = await crud.read_receipts_with_drugs(
            session=session
        )
        receipt_schemas = [
            await serialize_drug_movement_card(receipt)
            for receipt in receipts[start:end]
        ]
        return DrugMovements(
            drug_movements=receipt_schemas,
            total_count=len(receipts),
            page=page,
            per_page=per_page,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/{drug_movement_id}/", response_model=DrugMovementDetail)
async def get_receipt(
    drug_movement: DrugMovement = Depends(drug_movement_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugMovementDetail, dict]:
    try:
        drugs: list[DrugInMovement] = await crud.read_drugs_in_drug_movement(
            session=session, drug_movement=drug_movement
        )
        drug_schemas: list[DrugInMovementSchema] = [
            await serialize_drug_in_movement(drug) for drug in drugs
        ]
        return DrugMovementDetail(
            id=drug_movement.id,
            operation_date=drug_movement.operation_date,
            drugs=drug_schemas,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.delete(
    "/{drug_movement_id}/",
    response_model=SuccessMessage,
    status_code=status.HTTP_202_ACCEPTED,
)
async def delete_drug_movement(
    drug_movement: DrugMovement = Depends(drug_movement_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_drug_movement(session=session, drug_movement=drug_movement)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
