from typing import Annotated

from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import DrugMovement, Operation

from . import crud


async def drug_movement_by_id(
    drug_movement_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> DrugMovement:
    """Получаем объект Перемещения по id"""

    drug_movement = await crud.read_drug_movement_by_id(session=session, drug_movement_id=drug_movement_id)
    if drug_movement is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "DrugMovement Not Found"},
        )
    return drug_movement


async def operation_by_id(
    operation_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Operation:
    """Получаем объект Операции по id"""

    operation = await crud.read_operation_by_id(session=session, operation_id=operation_id)
    if operation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Operation Not Found"},
        )
    return operation