from typing import Union
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Animal
from .schemas import AnimalSchema, AnimalUpdate
from . import crud
from .dependencies import animal_by_id

from vetwebapi.api_v1.company.schemas import SuccessMessage


router = APIRouter(prefix="/{company_id}/animals")


async def serialize_animal(animal: Animal) -> AnimalSchema:
    return AnimalSchema(
        id=animal.id,
        animal_group=animal.species.animal_group.name,
        species=animal.species.name,
        usage_type=animal.usage_type.name,
        gender=animal.gender.name,
        date_of_birth=animal.date_of_birth,
        nickname=animal.nickname,
        identification=animal.identification
    )


@router.get("/{animal_id}/", response_model=AnimalSchema)
async def get_animal(
    animal: Animal = Depends(animal_by_id),
) -> AnimalSchema:
    return await serialize_animal(animal=animal)
    

@router.delete("/{animal_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def delete_animal(
    request: Request,
    animal: Animal = Depends(animal_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_animal(session=session, animal=animal)
        redirect_url = request.url_for("companies")

        return RedirectResponse(redirect_url, status_code=302)
        # return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.put("/{animal_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def update_animal(
    request: Request,
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
            detail={"result": False, "error_message": "Internal Server Error"},
        )
