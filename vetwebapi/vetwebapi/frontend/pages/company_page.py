from fastapi import APIRouter, Request, Depends, Form, Path
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from fastapi.responses import HTMLResponse, RedirectResponse
from vetwebapi.core.settings import settings
from vetwebapi.core.database import db_manager
from vetwebapi.api_v1.company import crud, dependencies
from vetwebapi.api_v1.company.views import get_companies, get_company_detail
from vetwebapi.api_v1.company.schemas import Companies, CompanyIn, CompanyDetail, AddressIn, EmployeeIn
from vetwebapi.core.models import Company


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
    await crud.create_company(session=session, body=new_company_schema)
    redirect_url = request.url_for("companies")

    return RedirectResponse(redirect_url, status_code=302)


@router.get("/{company_id}/", response_class=HTMLResponse)
async def company_detail(request: Request, company: CompanyDetail = Depends(get_company_detail)):
    return settings.templates.TemplateResponse(
        "/companies/company_detail.html", {"request": request, "company": company}
    )


@router.get("/{company_id}/add_address", response_class=HTMLResponse)
async def add_address(
    request: Request,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    company: CompanyDetail = Depends(get_company_detail),
):
    regions = await crud.read_regions(session=session)
    districts = await crud.read_districts(session=session)
    cities = await crud.read_cities(session=session)
    streets = await crud.read_streets(session=session)
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
    session: AsyncSession = Depends(db_manager.scope_session_dependency)
):
    address_schema = AddressIn(
        street_id=int(street_id),
        house_number=house_number,
        phone_number1=phone_number1,
        phone_number2=phone_number2,
    )

    redirect_url = request.url_for("company_detail", **{"company_id": company_id})
    await crud.create_address(session=session, body=address_schema, company_id=company_id)
    return RedirectResponse(redirect_url, status_code=302)


@router.get("/{company_id}/add_employee", response_class=HTMLResponse)
async def add_employee(
    request: Request,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    company: CompanyDetail = Depends(get_company_detail),
):
    positions = await crud.read_positions(session=session)
    
    return settings.templates.TemplateResponse(
        "companies/add_employee.html",
        {
            "request": request,
            "positions": positions,
            "company": company,
        },
    )
    
@router.post("/{company_id}/add_employee")
async def add_employee(
    request: Request, 
    position_id: Annotated[str, Form(...)],
    lastname: Annotated[str, Form(...)],
    firstname: Annotated[str, Form(...)],
    company_id: int,
    patronymic: Annotated[str, Form()] = None,
    session: AsyncSession = Depends(db_manager.scope_session_dependency)
):
    employee_schema = EmployeeIn(
        position_id=int(position_id),
        lastname=lastname,
        firstname=firstname,
        patronymic=patronymic
    )

    redirect_url = request.url_for("company_detail", **{"company_id": company_id})
    await crud.create_employee(session=session, body=employee_schema, company_id=company_id)
    return RedirectResponse(redirect_url, status_code=302)