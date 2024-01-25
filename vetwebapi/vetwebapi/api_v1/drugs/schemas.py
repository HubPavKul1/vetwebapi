from datetime import date
from pydantic import BaseModel


class DrugIn(BaseModel):
    disease_id: int
    budget_id: int
    drug_manufacturer_id: int
    accounting_unit_id: int
    name: str
    butch: str
    control: str
    production_date: date
    expiration_date: date
    packing: float
    
    
class DrugSchema(BaseModel):
    name: str
    butch: str
    control: str
    production_date: date
    expiration_date: date
    
    
class DrugMovementIn(BaseModel):
    operation_date: date
    
    
class DrugMovementOut(DrugMovementIn):
    id: int
    operation: str
    
      
class DrugInMovementIn(BaseModel):
    drug_id: int
    packs_amount: int
    units_amount: float
    