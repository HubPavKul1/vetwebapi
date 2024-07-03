from datetime import date

from pydantic import BaseModel

class DateRangeIn(BaseModel):
    date_start: date
    date_end: date


class DrugReportItemSchema(BaseModel):
    id: int
    drug_name: str
    batch: str
    control: str
    production_date: date
    expiration_date: date
    packing: int
    packs_start: int | None
    units_start: int | None
    packs_received: int | None
    units_received: float | None
    packs_spent: int | None
    units_spent: float | None
    disposed_units: float | None
    units_spent_disposed: float | None
    packs_rest: int | None
    units_rest: float | None
    
class Report1VetBItemSchema(BaseModel):
    id: int
    disease: str
    drug_name: str
    batch: str
    packing: float
    units_start: float | None
    units_received: float | None
    units_spent: float | None
    animals_count: int | None
    disposed_units: float | None
    units_spent_disposed: float | None
    units_rest: float | None
    
    
class DrugReportSchema(BaseModel):
    drugs_report: list[DrugReportItemSchema]
    

class Report1VetBSchema(BaseModel):
    vet1B_report: list[Report1VetBItemSchema]