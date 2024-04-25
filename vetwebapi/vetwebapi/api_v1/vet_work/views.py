from typing import Union

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.api_v1.vet_work.schemas import DiseaseIn, DiseaseOut, Diseases
from vetwebapi.core.database import db_manager

from . import crud

router = APIRouter(prefix="/vet_work", tags=["VetWork"])


@router.get("/diseases", response_model=Diseases)
async def get_diseases_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Diseases, dict]:
    try:
        diseases = await crud.read_diseases(session=session)
        return Diseases(diseases=diseases)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


# @router.delete("/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
# async def delete_drug_route(
#     drug_id: int,
#     session: AsyncSession = Depends(db_manager.scope_session_dependency),
# ) -> Union[dict, SuccessMessage]:
#     try:
#         await crud.delete_drug(session=session, drug_id=drug_id)
#         return SuccessMessage()
#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail={"result": False, "error_message": "Internal Server Error"},
#         )
