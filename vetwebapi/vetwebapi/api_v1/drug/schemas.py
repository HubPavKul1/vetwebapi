from datetime import date
from pydantic import BaseModel, ConfigDict


class DrugIn(BaseModel):
    disease_id: int
    budget_id: int
    drug_manufacturer_id: int
    accounting_unit_id: int
    name: str
    packing: float
    image: str | None
    instruction: str | None
    
    
class DrugOut(DrugIn):
    id: int

    model_config = ConfigDict(from_attributes=True)


class Drugs(BaseModel):
    drugs: list[DrugOut]


    

class CatalogDrugSchema(DrugIn):
    id: int
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
    catalog_drug_id: int
    packs_amount: int
    units_amount: float
    
    
class DrugInMovementSchema(BaseModel):
    drug: CatalogDrugSchema
    packs_amount: int
    units_amount: float
    
    
class DrugMovementDetail(DrugMovementOut):
    drugs: list[DrugInMovementSchema]
    
class DrugMovements(BaseModel):
    drug_movements: list[DrugMovementOut]

    
    