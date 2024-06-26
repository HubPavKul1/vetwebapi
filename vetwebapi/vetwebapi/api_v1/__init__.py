from fastapi import APIRouter, Depends

from .auth.dependencies import current_active_user
from .auth.views import router as auth_router
from .company.views import router as company_router
from .drug.views import router as drug_router
from .vet_work.views import router as vet_work_router

router = APIRouter()
router.include_router(
    company_router,
    # dependencies=[Depends(current_active_user)]
)
router.include_router(auth_router)
router.include_router(drug_router)
router.include_router(vet_work_router)
