from fastapi import APIRouter, Request, Depends, Form, Path
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from fastapi.responses import HTMLResponse, RedirectResponse
from vetwebapi.core.settings import settings
from vetwebapi.core.database import db_manager
from vetwebapi.api_v1.company.crud import create_company

from vetwebapi.api_v1.company.employee.crud import create_employee, read_positions
from vetwebapi.api_v1.company.employee.schemas import EmployeeIn

from vetwebapi.api_v1.company.animal.crud import create_animal, read_genders, read_species, read_usage_types
from vetwebapi.api_v1.company.animal.schemas import AnimalIn
from vetwebapi.api_v1.company.animal.dependencies import animal_by_id

from vetwebapi.api_v1.company.address.crud import read_cities, read_districts, read_regions, read_streets, create_address
from vetwebapi.api_v1.company.address.schemas import AddressIn

from vetwebapi.api_v1.company.views import get_companies, get_company_detail
from vetwebapi.api_v1.company.schemas import (
    Companies,
    CompanyIn,
    CompanyDetail,
)

from vetwebapi.core.models import Company, Animal


router = APIRouter(prefix="/companies")


@router.get("/", response_class=HTMLResponse)
async def companies(request: Request, companies: Companies = Depends(get_companies)):
    return settings.templates.TemplateResponse(
        "/companies/companies.html", {"request": request, "companies": companies.companies}
    )


@router.get("/add_company", response_class=HTMLResponse)
async def add_company(request: Request):
    return settings.templates.TemplateResponse("companies/add_company.html", {"request": request})


@router.post("/add_company")
async def add_company(
    request: Request,
    full_name: Annotated[str, Form(...)],
    short_name: Annotated[str, Form(...)],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    new_company_schema = CompanyIn(full_name=full_name, short_name=short_name)
    await create_company(session=session, body=new_company_schema)
    redirect_url = request.url_for("companies")

    return RedirectResponse(redirect_url, status_code=302)


@router.get("/{company_id}/", response_class=HTMLResponse)
async def company_detail(request: Request, company: CompanyDetail = Depends(get_company_detail)):
    return settings.templates.TemplateResponse(
        "/companies/company_detail.html", {"request": request, "company": company}
    )


# Address
@router.get("/{company_id}/add_address", response_class=HTMLResponse)
async def add_address(
    request: Request,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    company: CompanyDetail = Depends(get_company_detail),
):
    regions = await read_regions(session=session)
    districts = await read_districts(session=session)
    cities = await read_cities(session=session)
    streets = await read_streets(session=session)
    return settings.templates.TemplateResponse(
        "companies/add_address.html",
        {
            "request": request,
            "regions": regions,
            "districts": districts,
            "cities": cities,
            "streets": streets,
            "company": company,
        },
    )


@router.post("/{company_id}/add_address")
async def add_address(
    request: Request,
    street_id: Annotated[str, Form(...)],
    house_number: Annotated[str, Form(...)],
    phone_number1: Annotated[str, Form(...)],
    company_id: int,
    phone_number2: Annotated[str, Form()] = None,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    address_schema = AddressIn(
        street_id=int(street_id),
        house_number=house_number,
        phone_number1=phone_number1,
        phone_number2=phone_number2,
    )

    redirect_url = request.url_for("company_detail", **{"company_id": company_id})
    await create_address(session=session, body=address_schema, company_id=company_id)
    return RedirectResponse(redirect_url, status_code=302)


# Employees
@router.get("/{company_id}/add_employee", response_class=HTMLResponse)
async def add_employee(
    request: Request,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    company: CompanyDetail = Depends(get_company_detail),
):
    positions = await read_positions(session=session)

    return settings.templates.TemplateResponse(
        "companies/add_employee.html",
        {"request": request, "positions": positions, "company": company},
    )


@router.post("/{company_id}/add_employee")
async def add_employee(
    request: Request,
    position_id: Annotated[str, Form(...)],
    lastname: Annotated[str, Form(...)],
    firstname: Annotated[str, Form(...)],
    company_id: int,
    patronymic: Annotated[str, Form()] = None,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    employee_schema = EmployeeIn(
        position_id=int(position_id), lastname=lastname, firstname=firstname, patronymic=patronymic
    )

    redirect_url = request.url_for("company_detail", **{"company_id": company_id})
    await create_employee(session=session, body=employee_schema, company_id=company_id)
    return RedirectResponse(redirect_url, status_code=302)


# Animals
@router.get("/{company_id}/add_animal", response_class=HTMLResponse)
async def add_animal_page(
    request: Request,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    company: CompanyDetail = Depends(get_company_detail),
):
    species = await read_species(session=session)
    genders = await read_genders(session=session)
    usage_types = await read_usage_types(session=session)

    return settings.templates.TemplateResponse(
        "companies/add_animal.html",
        {
            "request": request,
            "species": species,
            "genders": genders,
            "usage_types": usage_types,
            "company": company,
        },
    )


@router.post("/{company_id}/add_animal")
async def add_animal(
    request: Request,
    species_id: Annotated[str, Form(...)],
    gender_id: Annotated[str, Form(...)],
    usage_type_id: Annotated[str, Form(...)],
    company_id: int,
    date_of_birth: Annotated[str, Form(...)],
    nickname: Annotated[str, Form(...)],
    identification: Annotated[str, Form(...)],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    animal_schema = AnimalIn(
        species_id=int(species_id),
        gender_id=int(gender_id),
        usage_type_id=int(usage_type_id),
        date_of_birth=date_of_birth,
        nickname=nickname,
        identification=identification,
    )

    redirect_url = request.url_for("company_detail", **{"company_id": company_id})
    await create_animal(session=session, body=animal_schema, company_id=company_id)
    return RedirectResponse(redirect_url, status_code=302)


@router.get("/{company_id}/update_animal/{animal_id}", response_class=HTMLResponse)
async def update_animal(
    request: Request,
    company_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    animal: Animal = Depends(animal_by_id),
):
    species = await read_species(session=session)
    genders = await read_genders(session=session)
    usage_types = await read_usage_types(session=session)

    return settings.templates.TemplateResponse(
        "companies/update_animal.html",
        {
            "request": request,
            "species": species,
            "genders": genders,
            "usage_types": usage_types,
            "animal": animal,
            "company_id": company_id
            
        },
    )


@router.put("/edit/{animal_id}")
async def update_animal(request: Request, animal_id: int):
    pass
