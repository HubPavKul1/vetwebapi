from typing import Annotated

from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import VetWork

from . import crud


async def vetwork_by_id(
    vetwork_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> VetWork:
    vetwork = await crud.read_vetwork_by_id(session=session, vetwork_id=vetwork_id)
    if vetwork is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Drug Not Found"},
        )
    return vetwork
