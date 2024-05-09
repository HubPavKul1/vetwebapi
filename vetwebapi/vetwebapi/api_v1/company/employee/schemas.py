from pydantic import BaseModel, ConfigDict


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

class Employees(BaseModel):
    employees: list[EmployeeSchema]


class PositionSchema(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class PositionSchemas(BaseModel):
    positions: list[PositionSchema]
