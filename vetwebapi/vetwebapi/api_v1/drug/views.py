from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.api_v1.drug.schemas import DrugMovementIn, DrugMovementOut, DrugInMovementIn, DrugSchema, DrugIn, DrugMovements
from vetwebapi.api_v1.drug.dependencies import operation_by_id, drug_movement_by_id

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Drug, DrugMovement, Operation


from . import crud

router = APIRouter(prefix="/drugs", tags=["Drugs"])


@router.post("/{operation_id}", response_model=DrugMovementOut, status_code=status.HTTP_201_CREATED)
async def create_drug_movement_route(
    body: DrugMovementIn,
    operation: Operation = Depends(operation_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    drug_movement = await crud.create_drug_movement(session=session, body=body, operation_id=operation.id)
    return DrugMovementOut(
        id=drug_movement.id, 
        operation_date=drug_movement.operation_date, 
        operation=drug_movement.operation.name
        )
    
@router.post("/", response_model=DrugSchema, status_code=status.HTTP_201_CREATED)
async def create_drug_route(
    body: DrugIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> DrugSchema:
    drug = await crud.create_drug(session=session, body=body)
    return DrugSchema(
        name=drug.name,
        batch=drug.batch,
        control=drug.control,
        production_date=drug.production_date,
        expiration_date=drug.expiration_date, 
    )
    
    
@router.post("/{drug_movement_id}", response_model=SuccessMessage, status_code=status.HTTP_201_CREATED)
async def add_drug_to_movement_route(
    body: DrugInMovementIn,
    drug_movement: DrugMovement = Depends(drug_movement_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    drug_in_movement = await crud.add_drug_to_movement(session=session, body=body, drug_movement=drug_movement)


@router.get("/", response_model=DrugMovements)
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