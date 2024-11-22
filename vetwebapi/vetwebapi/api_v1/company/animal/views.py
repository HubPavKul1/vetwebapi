from typing import Union

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.schemas import SuccessMessage
from core.database import db_manager
from core.models import Animal

from . import crud
from .dependencies import animal_by_id
from .schemas import AnimalIn, AnimalUpdate, AnimalUpdatePartial

router = APIRouter(prefix="/{company_id}/animals")


@router.post("", response_model=SuccessMessage, status_code=status.HTTP_201_CREATED)
async def create_animal_route(
    body: AnimalIn,
    company_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.create_animal(session=session, body=body, company_id=company_id)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.delete("/{animal_id}", status_code=status.HTTP_202_ACCEPTED)
async def delete_animal_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    animal: Animal = Depends(animal_by_id),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_animal(session=session, animal=animal)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.put(
    "/{animal_id}", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED
)
async def update_animal_api(
    body: AnimalUpdate,
    animal: Animal = Depends(animal_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.update_animal(session=session, animal=animal, animal_update=body)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Something wrong on backend"},
        )


@router.patch(
    "/{animal_id}", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED
)
async def update_animal_api_partial(
    body: AnimalUpdatePartial,
    animal: Animal = Depends(animal_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.update_animal(
            session=session, animal=animal, animal_update=body, partial=True
        )
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Something wrong on backend"},
        )


@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_animals(
    company_id: int,
    file: UploadFile,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    if file.content_type not in ["text/csv"]:
        raise HTTPException(status_code=400, detail="Invalid file type")
    await crud.save_animals(session=session, company_id=company_id, file=file)
