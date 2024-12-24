from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.dependencies import get_pagination_params
from core.database import db_manager
from core.models import Address, Animal, Company, Employee

from . import crud
from .address.crud import (
    read_city_streets,
    read_district_cities,
    read_region_districts,
    read_regions,
)
from .address.dependencies import company_address
from .address.schemas import CitySchemas, DistrictSchemas, RegionSchemas, StreetSchemas
from .address.views import router as address_router
from .animal.crud import (
    read_animal_groups,
    read_genders,
    read_species,
    read_types_of_feeding,
    read_usage_types,
)
from .animal.dependencies import company_animals
from .animal.schemas import (
    AnimalGroupSchemas,
    Animals,
    GenderSchemas,
    SpeciesSchemas,
    TypeOfFeedingSchemas,
    UsageTypeSchemas,
)
from .animal.views import router as animal_router
from .dependencies import company_by_id
from .employee.crud import read_doctors, read_positions
from .employee.dependencies import company_employees
from .employee.schemas import Employees, PositionSchemas
from .employee.views import router as employee_router
from .schemas import (
    Companies,
    CompanyDetail,
    CompanyIn,
    CompanyOut,
    SuccessMessage,
    CompaniesPage,
)
from .serializers import (
    serialize_animals,
    serialize_company_card,
    serialize_company_detail,
    serialize_employees,
)

router = APIRouter(prefix="/companies", tags=["Companies"])
router.include_router(animal_router)
router.include_router(address_router)
router.include_router(employee_router)


@router.post("/", response_model=CompanyOut, status_code=status.HTTP_201_CREATED)
async def create_company_route(
    body: CompanyIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CompanyOut, dict]:
    try:
        company = await crud.create_company(session=session, body=body)
        logger.debug(
            "Company with company_id: {company_id} created!", company_id=company.id
        )
        return CompanyOut(company_id=company.id)

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


# Create many companies for pagination test
@router.post(
    "/test", response_model=SuccessMessage, status_code=status.HTTP_201_CREATED
)
async def create_test_companies_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> SuccessMessage:
    try:
        await crud.create_test_companies(session=session)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.post("/vets", response_model=CompanyOut, status_code=status.HTTP_201_CREATED)
async def create_clinic_route(
    body: CompanyIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CompanyOut, dict]:
    try:
        company = await crud.create_clinic(session=session, body=body)
        logger.debug(
            "VetClinic with company_id: {company_id} created!", company_id=company.id
        )
        return CompanyOut(company_id=company.id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.post("/labs", response_model=CompanyOut, status_code=status.HTTP_201_CREATED)
async def create_lab_route(
    body: CompanyIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CompanyOut, dict]:
    try:
        company = await crud.create_lab(session=session, body=body)
        logger.debug(
            "Lab with company_id: {company_id} created!", company_id=company.id
        )
        return CompanyOut(company_id=company.id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/", response_model=CompaniesPage)
async def get_companies(
    pagination: dict = Depends(get_pagination_params),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CompaniesPage, dict]:
    page = pagination["page"]
    per_page = pagination["per_page"]

    # Calculate the start and end indices for slicing the items list
    start = (page - 1) * per_page
    end = start + per_page
    try:
        companies = await crud.read_companies_with_options(session=session)
        logger.debug("The companies data is obtained from the database!")
        comp_schemas = [
            await serialize_company_card(company) for company in companies[start:end]
        ]
        logger.debug("The companies data serialized!")
        return CompaniesPage(
            companies=comp_schemas,
            total_count=len(companies),
            page=page,
            per_page=per_page,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/all", response_model=Companies)
async def get_all_companies(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Companies, dict]:

    try:
        companies = await crud.read_companies_with_options(session=session)
        logger.debug("The companies data is obtained from the database!")
        comp_schemas = [await serialize_company_card(company) for company in companies]
        logger.debug("The companies data serialized!")
        return Companies(companies=comp_schemas)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/vets", response_model=CompaniesPage)
async def get_clinics(
    pagination: dict = Depends(get_pagination_params),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CompaniesPage, dict]:
    page = pagination["page"]
    per_page = pagination["per_page"]

    # Calculate the start and end indices for slicing the items list
    start = (page - 1) * per_page
    end = start + per_page
    try:
        companies = await crud.read_clinics_with_options(session=session)
        logger.debug("The vets data is obtained from the database!")
        comp_schemas = [
            await serialize_company_card(company) for company in companies[start:end]
        ]
        logger.debug("The vets data serialized!")
        return CompaniesPage(
            companies=comp_schemas,
            total_count=len(companies),
            page=page,
            per_page=per_page,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/labs", response_model=CompaniesPage)
async def get_labs(
    pagination: dict = Depends(get_pagination_params),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CompaniesPage, dict]:
    page = pagination["page"]
    per_page = pagination["per_page"]

    # Calculate the start and end indices for slicing the items list
    start = (page - 1) * per_page
    end = start + per_page
    try:
        companies = await crud.read_labs_with_options(session=session)
        logger.debug("The labs data is obtained from the database!")
        comp_schemas = [
            await serialize_company_card(company) for company in companies[start:end]
        ]
        logger.debug("The labs data serialized!")
        return CompaniesPage(
            companies=comp_schemas,
            total_count=len(companies),
            page=page,
            per_page=per_page,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.delete(
    "/{company_id}/",
    response_model=SuccessMessage,
    status_code=status.HTTP_202_ACCEPTED,
)
async def delete_company(
    company: Company = Depends(company_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_company(session=session, company=company)
        logger.debug("The company with company_id: {company_id}", company_id=company.id)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/{company_id}/", response_model=CompanyDetail)
async def get_company_detail(
    company: Company = Depends(company_by_id),
    address: Address = Depends(company_address),
    employees: list[Employee] = Depends(company_employees),
    animals: list[Animal] = Depends(company_animals),
) -> Union[dict, CompanyDetail]:
    try:
        company_schema = await serialize_company_detail(
            company=company, address=address, employees=employees, animals=animals
        )
        logger.debug(
            "Got CompanyDetail with company_id: {company_id}", company_id=company.id
        )
        return company_schema

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/{company_id}/animals", response_model=Animals)
async def get_company_animals(
    animals: list[Animal] = Depends(company_animals),
) -> Union[dict, Animals]:
    try:
        animals_schema = await serialize_animals(animals=animals)
        logger.debug("Get company animals")
        return animals_schema

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


# Get data for add address form
@router.get("/regions", response_model=RegionSchemas)
async def get_regions_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[RegionSchemas, dict]:
    try:
        regions = await read_regions(session=session)
        return RegionSchemas(regions=regions)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/regions/{region_id}/districts", response_model=DistrictSchemas)
async def get_region_districts_route(
    region_id: int, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> Union[DistrictSchemas, dict]:
    try:
        districts = await read_region_districts(session=session, region_id=region_id)
        return DistrictSchemas(districts=districts)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/districts/{district_id}/cities", response_model=CitySchemas)
async def get_district_cities_route(
    district_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CitySchemas, dict]:
    try:
        cities = await read_district_cities(session=session, district_id=district_id)
        return CitySchemas(cities=cities)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/cities/{city_id}/streets", response_model=StreetSchemas)
async def get_city_streets_route(
    city_id: int, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> Union[StreetSchemas, dict]:
    try:
        streets = await read_city_streets(session=session, city_id=city_id)
        return StreetSchemas(streets=streets)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


# Get data for add employee form
@router.get("/positions", response_model=PositionSchemas)
async def get_positions_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[PositionSchemas, dict]:
    try:
        positions = await read_positions(session=session)
        return PositionSchemas(positions=positions)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/doctors", response_model=Employees)
async def get_doctors_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Employees, dict]:
    try:
        doctors = await read_doctors(session=session)
        return await serialize_employees(doctors)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


# Get data for add animal form
@router.get("/types_of_feeding", response_model=TypeOfFeedingSchemas)
async def get_types_of_feeding_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[TypeOfFeedingSchemas, dict]:
    try:
        types_of_feeding = await read_types_of_feeding(session=session)
        return TypeOfFeedingSchemas(types_of_feeding=types_of_feeding)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/usage_types", response_model=UsageTypeSchemas)
async def get_usage_types_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[UsageTypeSchemas, dict]:
    try:
        usage_types = await read_usage_types(session=session)
        return UsageTypeSchemas(usage_types=usage_types)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/{type_of_feeding_id}/animal_groups", response_model=AnimalGroupSchemas)
async def get_animal_groups_route(
    type_of_feeding_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[AnimalGroupSchemas, dict]:
    try:
        animal_groups = await read_animal_groups(
            session=session, type_of_feeding_id=type_of_feeding_id
        )
        return AnimalGroupSchemas(animal_groups=animal_groups)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/{animal_group_id}/species", response_model=SpeciesSchemas)
async def get_species_route(
    animal_group_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[SpeciesSchemas, dict]:
    try:
        species = await read_species(session=session, animal_group_id=animal_group_id)
        return SpeciesSchemas(species=species)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/{species_id}/genders", response_model=GenderSchemas)
async def get_genders_route(
    species_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[GenderSchemas, dict]:
    try:
        genders = await read_genders(session=session, species_id=species_id)
        return GenderSchemas(genders=genders)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
