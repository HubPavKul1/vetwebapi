from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.api_v1.drug.schemas import DrugMovementIn, DrugMovementOut,DrugSchema, DrugInMovementIn, DrugOut, DrugIn, Drugs, DrugMovements, Budgets, AccountingUnits, DrugManufacturers
from vetwebapi.api_v1.drug.dependencies import operation_by_id, drug_movement_by_id

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Drug, DrugMovement, Operation


from . import crud

router = APIRouter(prefix="/drugs", tags=["Drugs"])


async def serialize_drug(drug: Drug) -> DrugSchema:
    return DrugSchema(
        id=drug.id,
        disease=drug.disease.name,
        budget=drug.budget.name,
        drug_manufacturer=drug.drug_manufacturer.name,
        accounting_unit=drug.accounting_unit.name,
        name=drug.name,
        packing=drug.packing,
        image=drug.image,
        instruction=drug.instruction
    )


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
    
@router.post("/", response_model=DrugSchema, status_code=status.HTTP_201_CREATED)
async def create_drug_route(
    body: DrugIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> DrugSchema:
    drug = await crud.create_drug(session=session, body=body)
    
    return await serialize_drug(drug=drug)

@router.post("/upload/", status_code=status.HTTP_201_CREATED)
async def upload_drug_file_route(
    drug_id: int,
    file: UploadFile,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    if file.content_type not in [
        "text/plain", 
        "application/pdf", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg", 
        "image/png", 
        "image/jpg"
        ]:
        raise HTTPException(status_code=400, detail="Invalid file type")
    await crud.save_file(session=session, drug_id=drug_id, file=file)
    
    
@router.post("/{drug_movement_id}", response_model=SuccessMessage, status_code=status.HTTP_201_CREATED)
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
    
@router.get("/", response_model=Drugs)
async def get_drugs_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> Union[Drugs, dict]:
    try:
        drugs = await crud.read_drugs(session=session)
        return Drugs(drugs=drugs)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    

@router.delete("/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def delete_drug_route(
    drug_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_drug(session=session, drug_id=drug_id)
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