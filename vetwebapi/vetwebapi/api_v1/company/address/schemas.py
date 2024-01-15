from pydantic import BaseModel


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