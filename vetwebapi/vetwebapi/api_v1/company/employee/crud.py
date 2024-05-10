from operator import and_

from sqlalchemy import select
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import Employee, Position, Company

from .schemas import EmployeeIn

# Create


async def create_position(session: AsyncSession, name: str) -> None:
    new_position = Position(name=name)
    session.add(new_position)
    await session.commit()


async def create_employee(session: AsyncSession, body: EmployeeIn, company_id: int) -> None:
    new_employee = Employee(**body.model_dump())
    new_employee.lastname = new_employee.lastname.capitalize()
    new_employee.firstname = new_employee.firstname.capitalize()
    new_employee.patronymic = new_employee.patronymic.capitalize()
    new_employee.company_id = company_id
    session.add(new_employee)
    await session.commit()


# Read


async def read_company_employees(session: AsyncSession, company_id: int) -> list[Employee | None]:
    stmt = (
        select(Employee)
        .where(and_(Employee.company_id == company_id, Employee.is_active))
        .order_by(Employee.lastname)
    )
    return list(await session.scalars(stmt))


async def read_employees(session: AsyncSession) -> list[Employee | None]:
    stmt = (
        select(Employee)
        .where(Employee.is_active)
        .order_by(Employee.lastname)
    )
    return list(await session.scalars(stmt))


async def read_doctors(session: AsyncSession) -> list[Employee | None]:
    stmt = (
        select(Company)
        .options(selectinload(Company.employees))
        .where(and_(Company.is_active, Company.is_vet))
        .order_by(Company.short_name)
    )
    companies = await session.scalars(stmt)
    doctors = []
    for item in companies:
        docs = [emp for emp in item.employees]
        doctors.extend(docs)

    return doctors
   
 


async def read_employee_by_id(session: AsyncSession, employee_id: int) -> Employee | None:
    return await session.get(Employee, employee_id)


async def read_positions(session: AsyncSession) -> list[Position]:
    stmt = select(Position).order_by(Position.name)
    return list(await session.scalars(stmt))


# Update


# Delete
async def delete_employee(session: AsyncSession, employee: Employee) -> None:
    await session.delete(employee)
    await session.commit()
