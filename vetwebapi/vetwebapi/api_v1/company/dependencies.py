from typing import Annotated

from fastapi import Depends, HTTPException, Path, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import db_manager
from core.models import Company

from . import crud


async def company_by_id(
    company_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Company:
    """Получаем объект Компании по id"""

    company = await crud.read_company_by_id(session=session, company_id=company_id)
    if company is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Company Not Found"},
        )
    return company


def get_animal_group_id_params(animal_group_id: int = Query(0)):
    return {"animal_group_id": animal_group_id}
