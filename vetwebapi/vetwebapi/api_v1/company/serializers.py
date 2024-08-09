from api_v1.company.address.schemas import AddressSchema
from api_v1.company.animal.schemas import AnimalSchema, Animals
from api_v1.company.employee.schemas import EmployeeSchema, Employees
from core.models import Address, Animal, Company, Employee

from .schemas import CompanyCard, CompanyDetail


async def serialize_address(address: Address) -> AddressSchema:
    return AddressSchema(
        id=address.id,
        district=address.street.city.district.name,
        city=address.street.city.name,
        street=address.street.name,
        house_number=address.house_number,
        phone_number1=address.phone_number1,
        phone_number2=address.phone_number2,
    )


async def serialize_employee(employee: Employee) -> EmployeeSchema:
    return EmployeeSchema(
        id=employee.id,
        position=employee.position.name,
        lastname=employee.lastname,
        firstname=employee.firstname,
        patronymic=employee.patronymic,
        fullname=employee.fullname,
    )


async def serialize_employees(employees: list[Employee]) -> Employees:
    return Employees(
        employees=[await serialize_employee(employee=employee) for employee in employees]
    )


async def serialize_animal(animal: Animal) -> AnimalSchema:
    return AnimalSchema(
        id=animal.id,
        animal_group=animal.species.animal_group.name,
        species=animal.species.name,
        usage_type=animal.usage_type.name,
        gender=animal.gender.name,
        date_of_birth=animal.date_of_birth,
        nickname=animal.nickname,
        identification=animal.identification,
        is_active=animal.is_active,
    )


async def serialize_animals(animals: list[Animal]) -> Animals:
    return Animals(animals=[await serialize_animal(animal=animal) for animal in animals])


# Function to serialize data for company detail page
async def serialize_company_detail(
    company: Company,
    address: Address,
    employees: list[Employee | None],
    animals: list[Animal | None],
) -> CompanyDetail:
    emp_schemas: list[EmployeeSchema] = []
    animal_schemas: list[AnimalSchema] = []
    address_schema: AddressSchema = None
    if employees:
        emp_schemas = [await serialize_employee(employee) for employee in employees]

    if address is not None:
        address_schema = await serialize_address(address=address)

    if animals:
        animal_schemas = [await serialize_animal(animal=animal) for animal in animals]

    return CompanyDetail(
        id=company.id,
        full_name=company.full_name,
        short_name=company.short_name,
        address=address_schema,
        employees=emp_schemas,
        animals=animal_schemas,
    )


# Function to serialize data for company card
async def serialize_company_card(company: Company):
    address = company.addresses
    employees = company.employees
    address_schema: AddressSchema = None
    employee_schema: EmployeeSchema = None
    if address:
        address_schema = await serialize_address(address=address)
    if employees:
        employee_schema = await serialize_employee(employee=employees[0])

    return CompanyCard(
        id=company.id,
        full_name=company.full_name,
        short_name=company.short_name,
        address=address_schema,
        employee=employee_schema,
    )
