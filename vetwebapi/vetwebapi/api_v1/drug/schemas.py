from datetime import date
from pydantic import BaseModel, ConfigDict


class DrugIn(BaseModel):
    disease_id: int
    budget_id: int
    drug_manufacturer_id: int
    accounting_unit_id: int
    name: str
    batch: str
    control: str
    production_date: date
    expiration_date: date
    packing: float
    
    
class DrugSchema(BaseModel):
    name: str
    batch: str
    control: str
    production_date: date
    expiration_date: date
    
    
class DrugMovementIn(BaseModel):
    operation_date: date
    
    
class DrugMovementOut(DrugMovementIn):
    id: int

    model_config = ConfigDict(from_attributes=True)

      
class DrugInMovementIn(BaseModel):
    drug_id: int
    packs_amount: int
    units_amount: float
    
    
class DrugInMovementSchema(BaseModel):
    drug: DrugSchema
    packs_amount: int
    units_amount: float
    
    
class DrugMovementDetail(DrugMovementOut):
    drugs: list[DrugInMovementSchema]
    
class DrugMovements(BaseModel):
    drug_movements: list[DrugMovementOut]

    
    