from fastapi import APIRouter, Request, Depends, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from fastapi.responses import HTMLResponse, RedirectResponse
from vetwebapi.core.settings import settings
from vetwebapi.core.database import db_manager
from vetwebapi.api_v1.company import crud
from vetwebapi.api_v1.company.views import get_companies, get_company_detail
from vetwebapi.api_v1.company.schemas import Companies, CompanyIn, CompanyDetail
from vetwebapi.core.models import Company


router = APIRouter(prefix="/companies")


@router.get("/", response_class=HTMLResponse)
async def companies(request: Request, companies: Companies = Depends(get_companies)):
    return settings.templates.TemplateResponse(
        "/companies/companies.html", {"request": request, "companies": companies.companies}
    )


@router.get("/add_new_company", response_class=HTMLResponse)
async def add_new_company(request: Request):
    return settings.templates.TemplateResponse("companies/add_company.html", {"request": request})


@router.post("/add_company")
async def add_company(
    request: Request,
    full_name: Annotated[str, Form(...)],
    short_name: Annotated[str, Form(...)],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    new_company_schema = CompanyIn(full_name=full_name, short_name=short_name)
    new_company = await crud.create_company(session=session, body=new_company_schema)
    print(new_company)

    return RedirectResponse(url="/pages/companies", status_code=302)


@router.get("/company_detail/{company_id}", response_class=HTMLResponse)
async def company_detail(request: Request, company: CompanyDetail = Depends(get_company_detail)):
    return settings.templates.TemplateResponse(
        "/companies/company_detail.html", {"request": request, "company": company}
    )


@router.get("/add_address/{company_id}", response_class=HTMLResponse)
async def add_address(
    request: Request, session: AsyncSession = Depends(db_manager.scope_session_dependency)
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
        },
    )


@router.post("/add_address/{company_id}")
async def add_address(
    request: Request, 
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    data = await request.form()
    print("*****" * 20)
    print("data", data)
    return RedirectResponse(url="/pages/companies/company_detail/1", status_code=302)
