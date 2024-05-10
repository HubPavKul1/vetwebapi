from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage, EmployeeSchema
from vetwebapi.api_v1.drug.receipts.schemas import DrugInMovementIn
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
    serialize_animals_in_vetwork,
    serialize_vaccination_detail,
    )
from .dependencies import vetwork_by_id
from vetwebapi.core.database import db_manager

from . import crud

router = APIRouter(prefix="/vetwork", tags=["VetWork"])


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


@router.post("/{vetwork_id}/", status_code=status.HTTP_201_CREATED)
async def add_drug_to_vetwork_route(
    body: DrugInMovementIn,
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    await crud.add_drug_to_vetwork(
        session=session, body=body, vetwork=vetwork
    )


@router.get("/vaccinations", response_model=VetWorks)
async def get_diseases_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VetWorks, dict]:
    try:
        vaccinations = await crud.read_vaccinations(session=session)    
        return await serialize_vaccinations(vaccinations=vaccinations)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
        
@router.get("/{vetwork_id}/", response_model=VaccinationDetail)
async def get_vaccination_detail(
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VaccinationDetail | dict]:

    animals: list[AnimalInVetWork] = await crud.read_animals_in_vetwork(session=session, vetwork=vetwork)
    doctors: list[DoctorInVetWork] = await crud.read_doctors_in_vetwork(session=session, vetwork=vetwork)
    drug: DrugInMovementIn = await crud.read_drug_in_vetwork(session=session, vetwork=vetwork)
    return await serialize_vaccination_detail(
        vetwork=vetwork, 
        animals=animals,
        doctors=doctors,
        drug=drug
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
