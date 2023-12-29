from pydantic import BaseModel, ConfigDict


class BaseIn(BaseModel):
    name: str


class RegionIn(BaseIn):
    pass


class CompanyIn(BaseModel):
    full_name: str
    short_name: str


class CompanySchema(CompanyIn):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class SuccessMessage(BaseModel):
    result: bool = True


class CompanyOut(SuccessMessage):
    company_id: int


class Companies(SuccessMessage):
    companies: list[CompanySchema]
