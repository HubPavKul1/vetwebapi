from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from .schemas import DrugMovementIn, DrugMovementOut, DrugMovements, DrugInMovementIn
from .dependencies import drug_movement_by_id

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import DrugMovement


from . import crud

router = APIRouter(prefix="/receipts")


@router.post("/receipts", response_model=DrugMovementOut, status_code=status.HTTP_201_CREATED)
async def create_receipt_route(
    body: DrugMovementIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    drug_movement = await crud.create_receipt(session=session, body=body)
    return DrugMovementOut(
        id=drug_movement.id, 
        operation_date=drug_movement.operation_date, 
        operation=drug_movement.operation.name
        )
    
    
@router.post("/{drug_movement_id}/", response_model=SuccessMessage, status_code=status.HTTP_201_CREATED)
async def add_drug_to_movement_route(
    body: DrugInMovementIn,
    drug_movement: DrugMovement = Depends(drug_movement_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    drug_in_movement = await crud.add_drug_to_movement(session=session, body=body, drug_movement=drug_movement)
    
    
@router.get("/receipts", response_model=DrugMovements)
async def get_receipts(
    session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> Union[DrugMovements, dict]:
    try:
        receipts = await crud.read_receipts(session=session)
        return DrugMovements(drug_movements=receipts)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
