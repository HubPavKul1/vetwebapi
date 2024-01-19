from typing import Annotated

from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.database import db_manager
from vetwebapi.core.models import Employee

from .crud import read_company_employees, read_employee_by_id


async def employee_by_id(
    employee_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> Employee:
    """Получаем объект Работника по id"""

    employee = await read_employee_by_id(session=session, employee_id=employee_id)
    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"result": False, "error_message": "Employee Not Found"},
        )
    return employee


async def company_employees(
    company_id: Annotated[int, Path()],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
) -> list[Employee | None]:
    """Получаем список работников компании"""
    return await read_company_employees(session=session, company_id=company_id)
