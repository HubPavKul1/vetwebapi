from typing import Annotated

from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Address

from . import crud


async def company_address(
    company_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Address | None:
    """Получаем адрес компании"""
    return await crud.read_company_address(session=session, company_id=company_id)


async def address_by_id(
    address_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Address | None:
    """Получаем адрес по его id"""

    address = await crud.read_address_by_id(session=session, address_id=address_id)
    if address is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Address Not Found"},
        )
    return address
