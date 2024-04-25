from pydantic import BaseModel, ConfigDict


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


class BaseAddressSchema(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class RegionSchemas(BaseModel):
    regions: list[BaseAddressSchema]


class DistrictSchemas(BaseModel):
    districts: list[BaseAddressSchema]


class CitySchemas(BaseModel):
    cities: list[BaseAddressSchema]


class StreetSchemas(BaseModel):
    streets: list[BaseAddressSchema]
