from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.company.schemas import SuccessMessage
from core.database import db_manager
from core.models import Employee

from . import crud
from .dependencies import employee_by_id
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


@router.delete("/{employee_id}", status_code=status.HTTP_202_ACCEPTED)
async def delete_employee_route(
    employee: Employee = Depends(employee_by_id),
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Union[dict, SuccessMessage]:
    try:
        await crud.delete_employee(session=session, employee=employee)
        return SuccessMessage()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"result": False, "error_message": "Internal Server Error"},
        )
