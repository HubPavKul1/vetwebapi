from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.schemas import SuccessMessage
from core.database import db_manager
from core.models import Address

from . import crud
from .dependencies import address_by_id
from .schemas import AddressIn

router = APIRouter(prefix="/{company_id}/address")


@router.post("/", response_model=SuccessMessage, status_code=status.HTTP_201_CREATED)
async def create_address_route(
    body: AddressIn,
    company_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.create_address(session=session, body=body, company_id=company_id)
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.delete("/{address_id}", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def delete_address(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    address: Address = Depends(address_by_id),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_address(session=session, address=address)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
