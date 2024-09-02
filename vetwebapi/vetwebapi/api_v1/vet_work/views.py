from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from pathlib import Path

from api_v1.dependencies import get_pagination_params
from api_v1.company.schemas import SuccessMessage
from api_v1.drug.receipts.schemas import DrugInMovementIn
from core.models import VetWork, AnimalInVetWork, DoctorInVetWork, CompanyInVetWork
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
    DiagnosticMethods,
    AnimalInVetWorkUpdatePartial
    )
from .serializers import (
    serialize_vetworks,
    serialize_vetwork_detail
    )
from .dependencies import vetwork_by_id, animal_in_vetwork_by_id, company_in_vetwork_by_id
from core.database import db_manager

from . import crud
from .reports.views import router as report_router

router = APIRouter(prefix="/vetwork", tags=["VetWork"])
router.include_router(report_router)


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


@router.post("/{vetwork_id}/upload/", status_code=status.HTTP_201_CREATED)
async def upload_vetwork_file_route(
    file: UploadFile,
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Invalid file type")
    await crud.save_file(session=session, vetwork=vetwork, file=file)


@router.post("/{vetwork_id}/animals", status_code=status.HTTP_201_CREATED)
async def add_animals_to_vetwork_route(
    body: list[AnimalInVetWorkIn],
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    await crud.add_animals_to_vetwork(
        session=session, body=body, vetwork=vetwork
    )


@router.patch("/{vetwork_id}/animals/{animal_id}", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def update_animal_in_vetwork_api_partial(
    body: AnimalInVetWorkUpdatePartial,
    animal: AnimalInVetWork = Depends(animal_in_vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.update_animal_in_vetwork(session=session, animal=animal, animal_update=body, partial=True)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Something wrong on backend"},
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
    pagination: dict = Depends(get_pagination_params),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VetWorks, dict]:
    page = pagination["page"]
    per_page = pagination["per_page"]

    # Calculate the start and end indices for slicing the items list
    start = (page - 1) * per_page
    end = start + per_page
    try:
        vaccinations = await crud.read_vaccinations(session=session) 
        return await serialize_vetworks(vetworks=vaccinations[start:end], total_count=len(vaccinations), page=page, per_page=per_page)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    

@router.get("/diagnostics", response_model=VetWorks)
async def get_diagnostics_route(
    pagination: dict = Depends(get_pagination_params),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[VetWorks, dict]:
    page = pagination["page"]
    per_page = pagination["per_page"]

    # Calculate the start and end indices for slicing the items list
    start = (page - 1) * per_page
    end = start + per_page
    try:
        diagnostics = await crud.read_diagnostics(session=session)  
        return await serialize_vetworks(vetworks=diagnostics[start:end], total_count=len(diagnostics), page=page, per_page=per_page)
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

@router.get("/{vetwork_id}/files")
async def get_vetwork_files(
    vetwork: VetWork = Depends(vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    files = await crud.read_vetwork_files(session=session, vetwork=vetwork)
    file_paths = [Path(f"media/{file.file_path}") for file in files]
    return FileResponse(file_paths[1])
    # for file in file_paths:
    #     return FileResponse(file)


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
    

@router.delete("/{vetwork_id}/animals/{animal_id}", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def delete_vetwork_animal_route(
    animal: AnimalInVetWork = Depends(animal_in_vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_animal_in_vetwork(session=session, animal=animal)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
    

@router.delete("/{vetwork_id}/company/{company_id}", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED)
async def delete_vetwork_company_route(
    company: CompanyInVetWork = Depends(company_in_vetwork_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_company_in_vetwork(session=session, company=company)
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


