from datetime import date
from pydantic import BaseModel, ConfigDict


class DrugIn(BaseModel):
    disease_id: int
    budget_id: int
    drug_manufacturer_id: int
    accounting_unit_id: int
    name: str
    packing: int
    image: str | None = None
    instruction: str | None = None
    
    
class DrugSchema(BaseModel):
    id: int
    disease: str
    budget: str
    drug_manufacturer: str
    accounting_unit: str
    name: str
    packing: int
    image: str | None = None
    instruction: str | None = None
    
    
    
class DrugOut(DrugIn):
    id: int

    model_config = ConfigDict(from_attributes=True)
    
class DrugCard(BaseModel):
    id: int
    name: str
    drug_manufacturer: str
    image: str | None = None
    instruction: str | None = None


class Drugs(BaseModel):
    drugs: list[DrugCard]


    

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
    
    
    
class BaseDrugSchema(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)
    
class Budgets(BaseModel):
    budgets: list[BaseDrugSchema]
    
class AccountingUnits(BaseModel):
    accounting_units: list[BaseDrugSchema]
    
class DrugManufacturers(BaseModel):
    drug_manufacturers: list[BaseDrugSchema]


    
    