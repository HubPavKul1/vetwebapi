from fastapi import APIRouter
from .pages.index import router as index_router
from .pages.company_page import router as company_router

router = APIRouter(prefix="/pages", tags=["Pages"])

router.include_router(index_router)
router.include_router(company_router)
