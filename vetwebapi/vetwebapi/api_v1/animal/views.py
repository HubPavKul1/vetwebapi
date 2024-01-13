from typing import Union
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Animal
from vetwebapi.api_v1.animal.schemas import AnimalSchema


from . import crud
from .dependencies import animal_by_id
from vetwebapi.api_v1.company.schemas import SuccessMessage
from .schemas import AnimalUpdate
   


router = APIRouter(prefix="/animals", tags=["Animals"])


@router.get(
    "/{animal_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED
)
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
