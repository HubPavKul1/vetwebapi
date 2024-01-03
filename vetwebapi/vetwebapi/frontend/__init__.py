from fastapi import APIRouter, Depends
from .pages.index import router as index_router
from .pages.company_page import router as company_router
from vetwebapi.api_v1.auth.dependencies import current_active_user

router = APIRouter(prefix="/pages", tags=["Pages"], dependencies=[Depends(current_active_user)])

router.include_router(index_router)
router.include_router(company_router)
