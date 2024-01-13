from typing import Annotated

from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Animal

from vetwebapi.api_v1.animal.crud import read_animal_by_id


async def animal_by_id(
    animal_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Animal | None:
    """Получаем объект Животного по id"""

    animal = await read_animal_by_id(session=session, animal_id=animal_id)
    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Animal Not Found"},
        )
    return animal
