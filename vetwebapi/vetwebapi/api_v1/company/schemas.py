from pydantic import BaseModel, ConfigDict


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


class AddressSchema(BaseModel):
    street: StreetSchema
    house_number: str
    phone_number1: str
    phone_number2: str | None = ""


class CompanyIn(BaseModel):
    full_name: str
    short_name: str


class CompanySchema(CompanyIn):
    id: int

    model_config = ConfigDict(from_attributes=True)


class CompanyDetail(CompanySchema):
    address: AddressSchema
    


class SuccessMessage(BaseModel):
    result: bool = True


class CompanyOut(SuccessMessage):
    company_id: int


class Companies(SuccessMessage):
    companies: list[CompanySchema]
