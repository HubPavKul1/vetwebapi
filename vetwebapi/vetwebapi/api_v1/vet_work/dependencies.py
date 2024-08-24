from typing import Annotated

from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import db_manager
from core.models import VetWork, AnimalInVetWork, CompanyInVetWork

from . import crud


async def vetwork_by_id(
    vetwork_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> VetWork:
    vetwork = await crud.read_vetwork_by_id(session=session, vetwork_id=vetwork_id)
    if vetwork is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "VetWork Not Found"},
        )
    return vetwork

async def animal_in_vetwork_by_id(
    animal_id: Annotated[int, Path()],
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> AnimalInVetWork:

    animal = await crud.read_animal_in_vetwork_by_id(animal_id=animal_id, vetwork=vetwork, session=session)
    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Animal Not Found"},
        )
    return animal

async def company_in_vetwork_by_id(
        company_id: Annotated[int, Path()],
        vetwork: VetWork = Depends(vetwork_by_id),
        session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> CompanyInVetWork:
    
    company = await crud.read_company_in_vetwork_by_id(session=session, vetwork=vetwork, company_id=company_id)
    if company is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Company Not Found"},
        )
    return company
    
