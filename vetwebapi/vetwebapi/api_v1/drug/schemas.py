from datetime import date
from pydantic import BaseModel, ConfigDict

# Drug
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
    
    
# CATALOG
class CatalogDrugIn(BaseModel):
    drug_id: int
    batch: str
    control: str
    production_date: date
    expiration_date: date
    
class CatalogDrugSchema(CatalogDrugIn):
    id: int
    name: str
    image: str | None = None
    
class Catalog(BaseModel):
    catalog_drugs: list[CatalogDrugSchema]
    
 

    
    
# Drug Select  
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
    
    
class DrugName(BaseModel):
    id: int
    name: str
    
class DrugNames(BaseModel):
    drugs: list[DrugName]


    
    