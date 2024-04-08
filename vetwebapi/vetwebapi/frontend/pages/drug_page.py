from fastapi import APIRouter, Request, Depends, Form, UploadFile, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from fastapi.responses import HTMLResponse, RedirectResponse
from vetwebapi.core.settings import settings
from vetwebapi.core.database import db_manager
from vetwebapi.api_v1.drug.crud import create_receipt, create_drug
from vetwebapi.api_v1.drug.schemas import DrugMovementIn, DrugMovementDetail, DrugMovements
from vetwebapi.api_v1.drug.dependencies import drug_movement_by_id, operation_by_id

from vetwebapi.api_v1.drug.views import get_receipts
from vetwebapi.core.models import Drug, DrugMovement


router = APIRouter(prefix="/drugs")


@router.get("/receipts", response_class=HTMLResponse)
async def receipts(request: Request, receipts: DrugMovements = Depends(get_receipts)):
    return settings.templates.TemplateResponse(
        "/drugs/receipts.html", {"request": request, "receipts": receipts.drug_movements}
    )
    
    
@router.get("/add_receipt", response_class=HTMLResponse)
async def add_receipt_page(request: Request):
    return settings.templates.TemplateResponse("drugs/add_receipt.html", {"request": request})