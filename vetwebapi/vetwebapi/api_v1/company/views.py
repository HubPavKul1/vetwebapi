from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Address, Animal, Company, Employee

from . import crud
from .address.crud import read_regions, read_districts, read_cities, read_streets
from .address.dependencies import company_address
from .address.schemas import RegionSchemas, DistrictSchemas, CitySchemas, StreetSchemas
from .address.views import router as address_router
from .address.views import serialize_address
from .animal.dependencies import company_animals
from .animal.schemas import AnimalSchema
from .animal.views import router as animal_router
from .animal.views import serialize_animal
from .dependencies import company_by_id
from .employee.dependencies import company_employees
from .employee.schemas import EmployeeSchema
from .employee.views import router as employee_router
from .employee.views import serialize_employee
from .schemas import Companies, CompanyDetail, CompanyIn, CompanyOut, SuccessMessage

router = APIRouter(prefix="/companies", tags=["Companies"])
router.include_router(animal_router)
router.include_router(address_router)
router.include_router(employee_router)


@router.post("/", response_model=CompanyOut, status_code=status.HTTP_201_CREATED)
async def create_company_route(
    body: CompanyIn, session: AsyncSession = Depends(db_manager.scope_session_dependency)
) -> Union[CompanyOut, dict]:
    try:
        company = await crud.create_company(session=session, body=body)
        return CompanyOut(company_id=company.id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.get("/", response_model=Companies)
async def get_companies(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[Companies, dict]:
    try:
        companies = await crud.read_companies(session=session)
        return Companies(companies=companies)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


@router.delete(
    "/{company_id}/", response_model=SuccessMessage, status_code=status.HTTP_202_ACCEPTED
)
async def delete_company(
    company: Company = Depends(company_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_company(session=session, company=company)
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
    employees: list[Employee | None] = Depends(company_employees),
    animals: list[Animal | None] = Depends(company_animals),
) -> Union[dict, CompanyDetail]:
    try:
        employee_schemas: list[EmployeeSchema] = []
        if employees:
            employee_schemas = [
                await serialize_employee(employee=employee) for employee in employees
            ]

        if address is not None:
            address = await serialize_address(address=address)

        animal_schemas: list[AnimalSchema] = []
        if animals:
            animal_schemas = [await serialize_animal(animal=animal) for animal in animals]

        return CompanyDetail(
            id=company.id,
            full_name=company.full_name,
            short_name=company.short_name,
            address=address,
            employees=employee_schemas,
            animals=animal_schemas,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
        
# Получаем данные для формы адрес        
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

@router.get("/districts", response_model=DistrictSchemas)
async def get_districts_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[DistrictSchemas, dict]:
    try:
        districts = await read_districts(session=session)
        return DistrictSchemas(districts=districts)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
        
@router.get("/cities", response_model=CitySchemas)
async def get_districts_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CitySchemas, dict]:
    try:
        cities = await read_cities(session=session)
        return CitySchemas(cities=cities)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
        

@router.get("/streets", response_model=StreetSchemas)
async def get_districts_route(
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[StreetSchemas, dict]:
    try:
        streets = await read_streets(session=session)
        return StreetSchemas(streets=streets)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
