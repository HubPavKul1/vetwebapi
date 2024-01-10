from typing import TYPE_CHECKING
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy.orm import selectinload, joinedload

from vetwebapi.core.models import Company, Address, Region, District, City, Street, Employee, Position, Role

from .schemas import CompanyIn, AddressSchema, AddressIn, EmployeeIn, EmployeeSchema

# Create Data

async def create_company(session: AsyncSession, body: CompanyIn) -> Company:
    new_company = Company(**body.model_dump())
    session.add(new_company)
    await session.commit()
    await session.refresh(new_company)
    return new_company

async def create_position(session: AsyncSession, name: str) -> None:
    new_position = Position(name=name)
    session.add(new_position)
    await session.commit()
    
async def create_role(session: AsyncSession, name: str) -> None:
    new_role = Role(name=name)
    session.add(new_role)
    await session.commit()

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
    
async def create_region(session: AsyncSession, name: str) -> int:
    new_region = Region(name=name)
    session.add(new_region)
    await session.commit()
    await session.refresh(new_region)
    return new_region.id
    
async def create_district(session: AsyncSession, name: str, region_id: int) -> int:
    new_district = District(region_id=region_id, name=name)
    session.add(new_district)
    await session.commit()
    await session.refresh(new_district)
    return new_district.id

async def create_city(session: AsyncSession, name: str, district_id: int) -> int:
    new_city = City(district_id=district_id, name=name)
    session.add(new_city)
    await session.commit()
    await session.refresh(new_city)
    return new_city.id

async def create_street(session: AsyncSession, name: str, city_id: int) -> None:
    new_street = Street(city_id=city_id, name=name)
    session.add(new_street)
    await session.commit()
    

# Read Data

async def read_companies(session: AsyncSession) -> list[Company]:
    stmt = select(Company).order_by(Company.short_name)
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
    stmt = select(District).order_by(District.name)
    return list(await session.scalars(stmt))


async def read_cities(session: AsyncSession) -> list[City]:
    stmt = select(City).order_by(City.name)
    return list(await session.scalars(stmt))


async def read_streets(session: AsyncSession) -> list[Street]:
    stmt = select(Street).order_by(Street.name)
    return list(await session.scalars(stmt))

async def read_company_employees(session: AsyncSession, company: Company) -> list[EmployeeSchema]:
    """перенести схему во вью"""
    stmt = select(Employee).where(Employee.company_id == company.id)
    employees = await session.scalars(stmt)
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
    


