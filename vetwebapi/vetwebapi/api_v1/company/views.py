from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Company

from . import crud
from .dependencies import company_by_id
from .schemas import (
    Companies,
    CompanyIn,
    CompanyOut,
    CompanySchema,
    SuccessMessage,
    CompanyDetail,
    AddressSchema,
)

router = APIRouter(prefix="/companies", tags=["Companies"])


@router.post("/", response_model=CompanyOut, status_code=201)
async def create_company_route(
    body: CompanyIn, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> Union[CompanyOut, dict]:
    try:
        company = await crud.create_company(session=session, body=body)
        return CompanyOut(company_id=company.id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/", response_model=Companies)
async def get_companies(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Companies, dict]:
    try:
        companies = await crud.read_companies(session=session)
        return Companies(companies=companies)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.delete("/{company_id}", response_model=SuccessMessage)
async def delete_company(
    company: Company = Depends(company_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_company(session=session, company=company)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.post("/{company_id}/address", response_model=SuccessMessage, status_code=201)
async def create_address_route(
    body: AddressSchema,
    company: Company = Depends(company_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.create_address(session=session, body=body, company=company)
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/{company_id}", response_model=CompanyDetail)
async def get_company_detail(
    company: Company = Depends(company_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, CompanyDetail]:
    try:
        address = await crud.read_address(session=session, company=company)
        return CompanyDetail(
            id=company.id,
            full_name=company.full_name,
            short_name=company.short_name,
            address=address,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
