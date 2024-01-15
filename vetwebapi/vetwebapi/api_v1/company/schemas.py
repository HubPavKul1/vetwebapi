from pydantic import BaseModel, ConfigDict

from .animal.schemas import AnimalSchema
from .address.schemas import AddressSchema
from .employee.schemas import EmployeeSchema


class BaseIn(BaseModel):
    name: str


class CompanyIn(BaseModel):
    full_name: str
    short_name: str


class CompanySchema(CompanyIn):
    id: int

    model_config = ConfigDict(from_attributes=True)


class SuccessMessage(BaseModel):
    result: bool = True


class CompanyOut(SuccessMessage):
    company_id: int


class Companies(SuccessMessage):
    companies: list[CompanySchema]
    

    
class CompanyDetail(CompanySchema):
    address: AddressSchema | None = None
    employees: list[EmployeeSchema] = []
    animals: list[AnimalSchema] = []