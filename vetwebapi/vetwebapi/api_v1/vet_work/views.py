from typing import Union

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from .schemas import DiseaseIn, DiseaseOut, Diseases, VetWorkOut, VetWorkIn, VetWorks
from .serializers import serialize_vaccinations
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
        
        
@router.post("/vaccinations", response_model=VetWorkOut, status_code=status.HTTP_201_CREATED)
async def create_vaccination(
    body: VetWorkIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    ) -> VetWorkOut:
    vaccination = await crud.create_vetwork(session=session, body=body)
    return VetWorkOut(id=vaccination.id, vetwork_date=vaccination.vetwork_date)


@router.get("/vaccinations", response_model=VetWorks)
async def get_diseases_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Diseases, dict]:
    try:
        vaccinations = await crud.read_vaccinations(session=session)   
        print(vaccinations)    
        return await serialize_vaccinations(vaccinations=vaccinations)
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
