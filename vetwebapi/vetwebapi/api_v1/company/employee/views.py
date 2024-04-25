from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1.company.schemas import SuccessMessage
from vetwebapi.core.database import db_manager

from . import crud
from .schemas import EmployeeIn

router = APIRouter(prefix="/{company_id}/employees")


@router.post("/", response_model=SuccessMessage, status_code=status.HTTP_201_CREATED)
async def create_employee_route(
    body: EmployeeIn,
    company_id: int,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.create_employee(session=session, body=body, company_id=company_id)
        return SuccessMessage
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
