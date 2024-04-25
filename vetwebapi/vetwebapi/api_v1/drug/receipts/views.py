from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.core.database import db_manager
from vetwebapi.core.models import DrugMovement

from . import crud
from .dependencies import drug_movement_by_id
from .schemas import DrugInMovementIn, DrugMovementIn, DrugMovementOut, DrugMovements, DrugMovementDetail
from .serializers import serialize_drug_in_movement

router = APIRouter(prefix="/receipts")


@router.post("/", response_model=DrugMovementOut, status_code=status.HTTP_201_CREATED)
async def create_receipt_route(
    body: DrugMovementIn, session: AsyncSession = Depends(db_manager.scope_session_dependency)
):
    drug_movement = await crud.create_receipt(session=session, body=body)
    return DrugMovementOut(
        id=drug_movement.id,
        operation_date=drug_movement.operation_date,
        operation=drug_movement.operation.name,
    )


@router.post(
    "/{drug_movement_id}/", response_model=SuccessMessage, status_code=status.HTTP_201_CREATED
)
async def add_drug_to_movement_route(
    body: DrugInMovementIn,
    drug_movement: DrugMovement = Depends(drug_movement_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    drug_in_movement = await crud.add_drug_to_movement(
        session=session, body=body, drug_movement=drug_movement
    )


@router.get("/", response_model=DrugMovements)
async def get_receipts(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugMovements, dict]:
    try:
        receipts = await crud.read_receipts(session=session)
        return DrugMovements(drug_movements=receipts)
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
        drugs = await crud.read_drugs_in_drug_movement(session=session, drug_movement=drug_movement)
        drug_schemas = [await serialize_drug_in_movement(item=drug) for drug in drugs]
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
    "/{drug_movement_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED
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
