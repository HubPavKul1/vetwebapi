from pydantic import BaseModel, ConfigDict

from api_v1.schemas import SuccessMessage

from .address.schemas import AddressSchema
from .animal.schemas import AnimalSchema
from .employee.schemas import EmployeeSchema


class BaseIn(BaseModel):
    name: str


class CompanyIn(BaseModel):
    full_name: str
    short_name: str


class CompanyCard(CompanyIn):
    id: int
    address: AddressSchema | None = None
    employee: EmployeeSchema | None = None
    animal: AnimalSchema | None = None


class CompanySchema(CompanyIn):
    id: int

    model_config = ConfigDict(from_attributes=True)


class CompanyOut(SuccessMessage):
    company_id: int


class Companies(BaseModel):
    companies: list[CompanyCard]


class CompaniesPage(Companies):
    total_count: int
    page: int
    per_page: int


class CompanyDetail(CompanySchema):
    address: AddressSchema | None = None
    employees: list[EmployeeSchema] = []
    animals: list[AnimalSchema] = []
