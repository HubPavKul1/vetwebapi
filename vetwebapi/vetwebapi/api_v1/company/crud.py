from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload

from vetwebapi.core.models import Company, Address, Region, District, City, Street, Employee, Position

from .schemas import CompanyIn, AddressSchema, AddressIn, EmployeeIn, EmployeeSchema


async def create_company(session: AsyncSession, body: CompanyIn) -> Company:
    new_company = Company(**body.model_dump())
    session.add(new_company)
    await session.commit()
    await session.refresh(new_company)
    return new_company


async def create_address(session: AsyncSession, body: AddressIn, company_id: int) -> None:
    new_address = Address(**body.model_dump())
    new_address.company_id = company_id
    session.add(new_address)
    await session.commit()
    
async def create_employee(session: AsyncSession, body: EmployeeIn, company_id: int) -> None:
    new_employee = Employee(**body.model_dump())
    new_employee.company_id = company_id
    session.add(new_employee)
    await session.commit()
    

async def read_companies(session: AsyncSession) -> list[Company]:
    stmt = select(Company)
    return list(await session.scalars(stmt))


async def delete_company(session: AsyncSession, company: Company) -> None:
    await session.delete(company)
    await session.commit()


async def read_company_by_id(session: AsyncSession, company_id: int) -> Company | None:
    return await session.get(Company, company_id)


async def read_address(session: AsyncSession, company: Company) -> Address | None:
    stmt = select(Address).where(Address.company_id == company.id)
    address = await session.scalar(stmt)
    return address


async def read_region_by_name(session: AsyncSession, region_name: str) -> Region | None:
    stmt = select(Region).where(Region.name.ilike(region_name))
    return await session.scalar(stmt)


async def read_district_by_name(session: AsyncSession, district_name: str) -> District | None:
    stmt = select(District).where(District.name.ilike(district_name))
    return await session.scalar(stmt)


async def read_city_by_name(session: AsyncSession, city_name: str) -> City | None:
    stmt = select(City).where(City.name.ilike(city_name))
    return await session.scalar(stmt)


async def read_street_by_id(session: AsyncSession, street_id: int) -> Street | None:
    stmt = select(Street).where(Street.id == street_id)
    return await session.scalar(stmt)


async def read_regions(session: AsyncSession) -> list[Region]:
    stmt = select(Region)
    return list(await session.scalars(stmt))


async def read_districts(session: AsyncSession) -> list[District]:
    stmt = select(District)
    return list(await session.scalars(stmt))


async def read_cities(session: AsyncSession) -> list[City]:
    stmt = select(City)
    return list(await session.scalars(stmt))


async def read_streets(session: AsyncSession) -> list[Street]:
    stmt = select(Street)
    return list(await session.scalars(stmt))

async def read_company_employees(session: AsyncSession, company: Company) -> list[EmployeeSchema]:
    stmt = select(Employee).where(Employee.company_id == company.id)
    employees = await session.scalars(stmt)
    print(employees)
    employee_schemas: list[EmployeeSchema] = []
    if employees:
        employee_schemas = [
            EmployeeSchema(
            position=item.position.name, 
            lastname=item.lastname, 
            firstname=item.firstname, 
            patronymic=item.patronymic
            ) for item in employees
            ]
    return employee_schemas
        
async def read_positions(session: AsyncSession) -> list[Position]:
    stmt = select(Position)
    return list(await session.scalars(stmt))
    


