from pydantic import BaseModel


class BaseIn(BaseModel):
    name: str

class RegionIn(BaseIn):
    pass
    
class CompanyIn(BaseModel):
    full_name: str
    short_name: str

class CompanyOut(BaseModel):
    result: bool
    company_id: int
    

class SuccessMessage(BaseModel):
    result: bool = True
