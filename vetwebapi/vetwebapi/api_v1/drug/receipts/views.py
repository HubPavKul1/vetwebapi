from typing import Union
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.core.database import db_manager
from vetwebapi.core.models import DrugMovement, DrugInMovement

from . import crud
from .dependencies import drug_movement_by_id
from .schemas import (
    DrugInMovementIn, 
    DrugMovementIn, 
    DrugMovementOut, 
    DrugMovements, 
    DrugMovementDetail, 
    DrugInMovementSchema, 
    DateRangeIn, 
    DrugReportSchema, 
    DrugReportItemSchema
    )
from .serializers import (
    serialize_drug_in_movement, 
    serialize_drug_movement_card, 
    serialize_drug_in_report
    )

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
    "/{drug_movement_id}/", status_code=status.HTTP_201_CREATED
)
async def add_drug_to_movement_route(
    body: DrugInMovementIn,
    drug_movement_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    await crud.add_drug_to_movement(
        session=session, body=body, drug_movement_id=drug_movement_id
    )


@router.get("/", response_model=DrugMovements)
async def get_receipts(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugMovements, dict]:
    try:
        receipts: list[DrugMovement] = await crud.read_receipts_with_drugs(session=session)
        receipt_schemas = [await serialize_drug_movement_card(receipt) for receipt in receipts]
        return DrugMovements(drug_movements=receipt_schemas)
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
        drugs: list[DrugInMovement] = await crud.read_drugs_in_drug_movement(session=session, drug_movement=drug_movement)
        drug_schemas: list[DrugInMovementSchema] = [await serialize_drug_in_movement(drug) for drug in drugs]
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
    

@router.post("/date_range", response_model=SuccessMessage)
async def get_receipts_in_date_range(
    body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[SuccessMessage, dict]:
    try:
        receipts: list[DrugMovement] = await crud.read_receipts_by_date(session=session, body=body)
        # receipt_schemas = [await serialize_drug_movement_card(receipt) for receipt in receipts]
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    

@router.post("/date_range_grouped", response_model=SuccessMessage)
async def get_receipts_ids_in_date_range(
    body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[SuccessMessage, dict]:
    try:
        receipts: list[int] = await crud.read_receipts_ids_by_date(session=session, body=body)
        print("*" * 20)
        print(receipts)
        print("*" * 20)
        # receipt_schemas = [await serialize_drug_movement_card(receipt) for receipt in receipts]
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    
    
@router.post("/drugs_in_receipt", response_model=SuccessMessage)
async def get_drugs_in_receipts(
    body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[SuccessMessage, dict]:
    try:
        drugs: list[DrugInMovement] = await crud.read_drugs_in_receipts_by_date(session=session, body=body)
        print("*" * 20)
        print(drugs)
        print("*" * 20)
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    
    
@router.post(
    "/drugs_report", 
    response_model=DrugReportSchema
    )
async def get_drugs_report(
    body: DateRangeIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DrugReportSchema, dict]:
    try:
        drugs: list[tuple] = await crud.read_drug_movement_report_by_date_range(session=session, body=body)
        drug_schema: list[DrugReportItemSchema] = [await serialize_drug_in_report(drug) for drug in drugs]
        print("*" * 20)
        print(drugs)
        print(drug_schema)
        print("*" * 20)
        return DrugReportSchema(drugs_report=drug_schema)
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
