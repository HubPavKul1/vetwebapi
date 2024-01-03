from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from vetwebapi.core.settings import settings
from vetwebapi.api_v1.company.views import get_companies
from vetwebapi.api_v1.company.schemas import Companies
from vetwebapi.core.models import Company


router = APIRouter(prefix="/companies")


@router.get("/", response_class=HTMLResponse)
async def get_companies_page(request: Request, companies: Companies = Depends(get_companies)):
    print("****" * 20)
    print("Companies: ", companies.companies)

    return settings.templates.TemplateResponse("/companies/companies.html", {"request": request, "companies": companies.companies})
