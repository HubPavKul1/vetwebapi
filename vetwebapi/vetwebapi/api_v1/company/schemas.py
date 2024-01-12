from pydantic import BaseModel, ConfigDict

from vetwebapi.api_v1.animal.schemas import AnimalSchema


class BaseIn(BaseModel):
    name: str


class RegionSchema(BaseIn):
    pass


class DistrictSchema(BaseIn):
    region: RegionSchema


class CitySchema(BaseIn):
    district: DistrictSchema


class StreetSchema(BaseIn):
    city: CitySchema


class AddressIn(BaseModel):
    street_id: int
    house_number: str
    phone_number1: str
    phone_number2: str | None = None


class AddressSchema(BaseModel):
    id: int
    district: str
    city: str
    street: str 
    house_number: str
    phone_number1: str
    phone_number2: str | None = None


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
    
class EmployeeIn(BaseModel):
    position_id: int
    lastname: str
    firstname: str
    patronymic: str

class EmployeeSchema(BaseModel):
    id: int
    position: str
    lastname: str
    firstname: str
    patronymic: str
    fullname: str
    
class CompanyDetail(CompanySchema):
    address: AddressSchema | None = None
    employees: list[EmployeeSchema] = []
    animals: list[AnimalSchema] = []