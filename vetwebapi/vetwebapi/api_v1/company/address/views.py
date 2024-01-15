from typing import Union
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Address
from .schemas import AddressSchema, AddressIn
from .dependencies import address_by_id

from . import crud
from vetwebapi.api_v1.company.schemas import SuccessMessage


router = APIRouter(prefix="/{company_id}/address")


async def serialize_address(address: Address) -> AddressSchema:
    return AddressSchema(
        id=address.id,
        district=address.street.city.district.name,
        city=address.street.city.name,
        street=address.street.name,
        house_number=address.house_number,
        phone_number1=address.phone_number1,
        phone_number2=address.phone_number2,
    )
    
    
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
    
    
        