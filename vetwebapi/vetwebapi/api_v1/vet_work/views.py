from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.api_v1.drug.receipts.schemas import DrugInMovementIn
from vetwebapi.core.models import VetWork, AnimalInVetWork, DoctorInVetWork, CompanyInVetWork
from .schemas import (
    Diseases, 
    VetWorkOut, 
    VaccinationIn, 
    VetWorks, 
    AnimalInVetWorkIn,
    CompanyInVetWorkIn,
    DiagnosticIn,
    VetWorkDetail,
    BiomaterialFixations,
    BiomaterialPackages,
    Biomaterials,
    DiagnosticMethods
    )
from .serializers import (
    serialize_vetworks,
    serialize_vetwork_detail
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


@router.post("/diagnostics", response_model=VetWorkOut, status_code=status.HTTP_201_CREATED)
async def create_diagnostic(
    body: DiagnosticIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    ) -> VetWorkOut:
    diagnostic = await crud.create_diagnostic(session=session, body=body)
    return VetWorkOut(id=diagnostic.id, vetwork_date=diagnostic.vetwork_date)


@router.post("/{vetwork_id}/drug", status_code=status.HTTP_201_CREATED)
async def add_drug_to_vetwork_route(
    body: DrugInMovementIn,
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    await crud.add_drug_to_vetwork(
        session=session, body=body, vetwork=vetwork
    )


@router.post("/{vetwork_id}/animals", status_code=status.HTTP_201_CREATED)
async def add_animals_to_vetwork_route(
    body: list[AnimalInVetWorkIn],
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    await crud.add_animals_to_vetwork(
        session=session, body=body, vetwork=vetwork
    )


@router.post("/{vetwork_id}/company", status_code=status.HTTP_201_CREATED)
async def add_company_to_vetwork_route(
    body: CompanyInVetWorkIn,
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    await crud.add_company_to_vetwork(
        session=session, body=body, vetwork=vetwork
    )


@router.get("/vaccinations", response_model=VetWorks)
async def get_vaccinations_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VetWorks, dict]:
    try:
        vaccinations = await crud.read_vaccinations(session=session) 
        return await serialize_vetworks(vetworks=vaccinations)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    

@router.get("/diagnostics", response_model=VetWorks)
async def get_diagnostics_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VetWorks, dict]:
    try:
        diagnostics = await crud.read_diagnostics(session=session)  
        return await serialize_vetworks(vetworks=diagnostics)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
        
@router.get("/{vetwork_id}/", response_model=VetWorkDetail)
async def get_vetwork_detail(
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VetWorkDetail | dict]:

    companies: list[CompanyInVetWork] = await crud.read_companies_in_vetwork(session=session, vetwork=vetwork)
    animals: list[AnimalInVetWork] = await crud.read_animals_in_vetwork(session=session, vetwork=vetwork)
    doctors: list[DoctorInVetWork] = await crud.read_doctors_in_vetwork(session=session, vetwork=vetwork)
    drug: DrugInMovementIn = await crud.read_drug_in_vetwork(session=session, vetwork=vetwork)
    return await serialize_vetwork_detail(
        vetwork=vetwork, 
        companies=companies,
        animals=animals,
        doctors=doctors,
        drug=drug
        )

@router.delete("/{vetwork_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def delete_vetwork_route(
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_vetwork(session=session, vetwork=vetwork)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    
# Data for diagnostic create:

@router.get("/biomaterial_fixations", response_model=BiomaterialFixations)
async def get_biomaterial_fixations(
    session: AsyncSession = Depends(db_manager.scope_session_dependency)
    ) -> Union[dict, BiomaterialFixations]:

    try:
        biomaterial_fixations = await crud.read_biomaterial_fixations(session=session)
        return BiomaterialFixations(biomaterial_fixations=biomaterial_fixations)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )

@router.get("/biomaterials", response_model=Biomaterials)
async def get_biomaterials(
    session: AsyncSession = Depends(db_manager.scope_session_dependency)
    ) -> Union[dict, Biomaterials]:

    try:
        biomaterials = await crud.read_biomaterials(session=session)
        return Biomaterials(biomaterials=biomaterials)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    
    
@router.get("/biomaterial_packages", response_model=BiomaterialPackages)
async def get_biomaterial_packages(
    session: AsyncSession = Depends(db_manager.scope_session_dependency)
    ) -> Union[dict, BiomaterialPackages]:

    try:
        biomaterial_packages = await crud.read_biomaterial_packages(session=session)
        return BiomaterialPackages(biomaterial_packages=biomaterial_packages)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )

@router.get("/diagnostic_methods", response_model=DiagnosticMethods)
async def get_diagnostic_methods(
    session: AsyncSession = Depends(db_manager.scope_session_dependency)
    ) -> Union[dict, DiagnosticMethods]:

    try:
        diagnostic_methods = await crud.read_diagnosic_methods(session=session)
        return DiagnosticMethods(diagnostic_methods=diagnostic_methods)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


