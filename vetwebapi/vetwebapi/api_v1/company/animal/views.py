from typing import Union

from fastapi import APIRouter, Depends, HTTPException, Request, UploadFile, status
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Animal

from . import crud
from .dependencies import animal_by_id
from .schemas import AnimalSchema, AnimalIn, AnimalUpdate, AnimalUpdatePartial

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
        identification=animal.identification,
        is_active=animal.is_active,
    )



@router.post("/", response_model=SuccessMessage, status_code=status.HTTP_201_CREATED)
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


@router.get("/{animal_id}/", response_model=AnimalSchema)
async def get_animal(animal: Animal = Depends(animal_by_id)) -> AnimalSchema:
    return await serialize_animal(animal=animal)



@router.delete("/{animal_id}/", status_code=status.HTTP_202_ACCEPTED)
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


@router.put("/{animal_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
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


@router.patch("/{animal_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def update_animal_api_partial(
    body: AnimalUpdatePartial,
    animal: Animal = Depends(animal_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.update_animal(session=session, animal=animal, animal_update=body, partial=True)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Something wrong on backend"},
        )


# @router.post("/upload/", status_code=status.HTTP_201_CREATED)
# async def upload_animals(
#     request: Request,
#     company_id: int,
#     file: UploadFile,
#     session: AsyncSession = Depends(db_manager.scope_session_dependency),
# ):
#     if file.content_type not in ["text/csv"]:
#         raise HTTPException(status_code=400, detail="Invalid file type")

#     # try:
#     await crud.save_animals(session=session, company_id=company_id, file=file)
#     redirect_url = request.url_for("company_detail", company_id=company_id)
#     return RedirectResponse(redirect_url, status_code=302)
    # except Exception:
    #     raise HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #         detail={"result": False, "error_message": "Internal Server Error"},
    #     )
    
@router.post("/upload/", status_code=status.HTTP_201_CREATED)
async def upload_animals(
    company_id: int,
    file: UploadFile,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    if file.content_type not in ["text/csv"]:
        raise HTTPException(status_code=400, detail="Invalid file type")
    await crud.save_animals(session=session, company_id=company_id, file=file)
    
