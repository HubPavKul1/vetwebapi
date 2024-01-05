from fastapi import APIRouter, Request, Depends, Form
from typing import Annotated
from fastapi.responses import HTMLResponse, RedirectResponse
from vetwebapi.core.settings import settings
from vetwebapi.api_v1.company.views import get_companies, create_company_route
from vetwebapi.api_v1.company.schemas import Companies, CompanyIn
from vetwebapi.core.models import Company


router = APIRouter(prefix="/companies")


@router.get("/", response_class=HTMLResponse, name="companies")
async def get_companies_page(request: Request, companies: Companies = Depends(get_companies)):
    return settings.templates.TemplateResponse(
        "/companies/companies.html", {"request": request, "companies": companies.companies}
    )


@router.get("/add_company", response_class=HTMLResponse, name="get_company_form")
async def get_add_company_form(request: Request):
    return settings.templates.TemplateResponse("companies/add_company.html", {"request": request})


@router.post("/add_company", response_class=HTMLResponse)
async def post_add_company_form(request: Request, full_name: Annotated[str, Form(...)], short_name: Annotated[str, Form(...)]):
    new_company_schema = CompanyIn(full_name=full_name, short_name=short_name)
    result = create_company_route(body=new_company_schema)
    if result["result"] == True:
        return RedirectResponse("/pages/companies")
    
    return settings.templates.TemplateResponse("companies/add_company.html", {"request": request})
