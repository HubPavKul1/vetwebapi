from typing import Annotated

from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import db_manager
from core.models import Drug

from . import crud


async def drug_by_id(
    drug_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Drug:
    drug = await crud.read_drug_by_id(session=session, drug_id=drug_id)
    if drug is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Drug Not Found"},
        )
    return drug
