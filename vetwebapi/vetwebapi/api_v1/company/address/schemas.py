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
    
class BaseSchema(BaseModel):
    id: int
    name: str
    
class RegionSchema(BaseSchema):
    model_config = ConfigDict(from_attributes=True)

class DistrictSchema(BaseSchema):
    model_config = ConfigDict(from_attributes=True)
    

class CitySchema(BaseSchema):
    model_config = ConfigDict(from_attributes=True)

class StreetSchema(BaseSchema):
    model_config = ConfigDict(from_attributes=True)

class RegionSchemas(BaseModel):
    regions: list[RegionSchema]
    
class DistrictSchemas(BaseModel):
    districts: list[DistrictSchema]

class CitySchemas(BaseModel):
    cities: list[CitySchema]
    
class StreetSchemas(BaseModel):
    streets: list[StreetSchema]