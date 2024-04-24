from typing import Annotated

from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import CatalogDrug

from . import crud


async def catalog_drug_by_id(
    id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> CatalogDrug:
    
    drug = await crud.read_catalog_drug_by_id(session=session, id=id)
    if drug is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Drug Not Found"},
        )
    return drug

    