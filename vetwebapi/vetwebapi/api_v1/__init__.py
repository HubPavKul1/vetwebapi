from fastapi import APIRouter, Depends

from .company.views import router as company_router


router = APIRouter()
router.include_router(company_router, prefix="/companies")
