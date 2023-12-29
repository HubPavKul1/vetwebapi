from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.api_v1.auth.dependencies import current_user
from vetwebapi.core.models import User

from . import crud
from .schemas import CompanyIn, CompanyOut, SuccessMessage
from .dependencies import company_by_id

router = APIRouter(tags=["Companies"])


@router.post("/", response_model=CompanyOut, status_code=201, dependencies=[Depends(current_user)])
async def create_company_route(
    body: CompanyIn,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[CompanyOut, dict]:
    try:
        company = await crud.create_company(session=session, body=body)
        return CompanyOut(company_id=company.id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )


# @router.get("/", response_model=Companies)
# async def get_companies(
#     session: AsyncSession = Depends(db_manager.scope_session_dependency),
# ) -> Union[Companies, dict]:
#     try:
#         companies = await crud.read_companies(session=session)
#         return Companies(companies=companies)
#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail={"result": False, "error_message": "Internal Server Error"},
#         )


# @router.delete("/{company_id}", response_model=SuccessMessage)
# async def delete_company(
#     company: Depends(company_by_id),
#     session: AsyncSession = Depends(db_manager.scope_session_dependency),
# ) -> Union[dict, SuccessMessage]:
#     try:
#         await crud.delete_tweet(session=session, company=company)
#         return SuccessMessage()
#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail={"result": False, "error_message": "Internal Server Error"},
#         )
        

