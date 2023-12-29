from fastapi import APIRouter, Depends

from .company.views import router as company_router
from .auth.views import router as auth_router


router = APIRouter()
router.include_router(company_router, prefix="/companies")
router.include_router(auth_router)
