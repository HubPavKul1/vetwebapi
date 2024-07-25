from typing import Annotated

from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import db_manager
from core.models import Animal

from .crud import read_animal_by_id, read_company_animals


async def animal_by_id(
    animal_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Animal:
    """Получаем объект Животного по id"""

    animal = await read_animal_by_id(session=session, animal_id=animal_id)
    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Animal Not Found"},
        )
    return animal


async def company_animals(
    company_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> list[Animal | None]:
    """Получаем список животных компании"""
    return await read_company_animals(session=session, company_id=company_id)
