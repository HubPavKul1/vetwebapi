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
    packs_received: int
    units_received: float
    packs_spent: int | None
    units_spent: float | None
    disposed_units: float | None
    packs_rest: int | None
    units_rest: float | None
    
class DrugReportSchema(BaseModel):
    drugs_report: list[DrugReportItemSchema]