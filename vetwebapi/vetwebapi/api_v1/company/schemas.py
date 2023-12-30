from pydantic import BaseModel, ConfigDict


class BaseIn(BaseModel):
    name: str


class RegionIn(BaseIn):
    pass


class DistrictIn(BaseIn):
    region: RegionIn


class CityIn(BaseIn):
    district: DistrictIn


class StreetIn(BaseIn):
    city: CityIn


class AddressSchema(BaseModel):
    city: CityIn
    street: StreetIn
    house_number: str
    phone_number1: str
    phone_number2: str | None


class CompanyIn(BaseModel):
    full_name: str
    short_name: str


class CompanySchema(CompanyIn):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class CompanyDetail(CompanySchema):
    address: AddressSchema
    


class SuccessMessage(BaseModel):
    result: bool = True


class CompanyOut(SuccessMessage):
    company_id: int


class Companies(SuccessMessage):
    companies: list[CompanySchema]
