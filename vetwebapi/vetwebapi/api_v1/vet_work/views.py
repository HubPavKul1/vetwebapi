from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage, EmployeeSchema
from vetwebapi.core.models import VetWork, AnimalInVetWork, DoctorInVetWork
from .schemas import (
    DiseaseIn, 
    DiseaseOut, 
    Diseases, 
    VetWorkOut, 
    VaccinationIn, 
    VetWorks, 
    VaccinationDetail,
    VaccinationSchema,
    AnimalInVetWorkSchema
    )
from .serializers import (
    serialize_vaccination,
    serialize_vaccinations, 
    serialize_doctors_in_vetwork, 
    serialize_animals_in_vetwork
    )
from .dependencies import vetwork_by_id
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
    body: VaccinationIn,
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
        return await serialize_vaccinations(vaccinations=vaccinations)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
        
@router.get("/vaccinations/{vetwork_id}/", response_model=VaccinationDetail)
async def get_vaccination_detail(
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VaccinationDetail | dict]:

    animals: list[AnimalInVetWork] = await crud.read_animals_in_vetwork(session=session, vetwork=vetwork)
    doctors: list[DoctorInVetWork] = await crud.read_doctors_in_vetwork(session=session, vetwork=vetwork)
    vacc_schema: VaccinationSchema = await serialize_vaccination(vaccination=vetwork)
    if animals:
        animals: list[AnimalInVetWorkSchema] = await serialize_animals_in_vetwork(items=animals)
    if doctors:
        doctors: list[EmployeeSchema] = await serialize_doctors_in_vetwork(items=doctors)
    return VaccinationDetail(
        vaccination=vacc_schema,
        animals=animals,
        doctors=doctors,
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
