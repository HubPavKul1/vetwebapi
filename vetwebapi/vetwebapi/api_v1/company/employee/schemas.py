from pydantic import BaseModel


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