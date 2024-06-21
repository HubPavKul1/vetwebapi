from datetime import date

from pydantic import BaseModel, ConfigDict


# Drug Movement
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
    id: int
    name: str
    disease: str
    batch: str
    control: str
    production_date: date
    expiration_date: date
    packs_amount: int
    units_amount: float
    drug_manufacturer: str
    drug_dosage: str
    administration_method: str
    place_of_administration: str
    disposal_method: str
    packing: int


class DrugReportItemSchema(BaseModel):
    id: int
    drug_name: str
    batch: str
    control: str
    production_date: date
    expiration_date: date
    packs_start: int | None
    units_start: int | None
    packs_rec: int
    units_rec: float
    packs_spent: int | None
    units_spent: float | None
    disposed_units: float | None
    packs_rest: int | None
    units_rest: float | None
    
class DrugReportSchema(BaseModel):
    drugs_report: list[DrugReportItemSchema]
    

class DrugMovementDetail(DrugMovementOut):
    drugs: list[DrugInMovementSchema] | None = None


class DrugMovements(BaseModel):
    drug_movements: list[DrugMovementDetail]    


class DateRangeIn(BaseModel):
    date_start: date
    date_end: date