from fastapi import APIRouter, Depends

from .pages.company_page import router as company_router
from .pages.index import router as index_router
from .pages.drug_page import router as drug_router
from vetwebapi.api_v1.auth.dependencies import current_active_user


router = APIRouter(
    prefix="/pages",
    tags=["Pages"],
    # dependencies=[Depends(current_active_user)],
)


router.include_router(index_router)
router.include_router(company_router)
router.include_router(drug_router)
