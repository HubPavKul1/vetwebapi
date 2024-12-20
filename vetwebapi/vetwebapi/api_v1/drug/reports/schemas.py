from datetime import date

from pydantic import BaseModel


class DrugReportItemSchema(BaseModel):
    id: int
    drug_name: str
    accounting_unit: str
    batch: str
    control: str
    production_date: date
    expiration_date: date
    packing: float
    packs_start: float | None
    units_start: float | None
    packs_received: float | None
    units_received: float | None
    packs_spent: float | None
    units_spent: float | None
    disposed_units: float | None
    units_spent_disposed: float | None
    packs_rest: float | None
    units_rest: float | None


class Report1VetBItemSchema(BaseModel):
    id: int
    diseases: list[str]
    drug_name: str
    accounting_unit: str
    batch: str
    packing: float
    units_start: float | None
    units_received: float | None
    units_spent: float | None
    animals_count: int | None
    disposed_units: float | None
    units_spent_disposed: float | None
    units_rest: float | None


class DrugRestSchema(BaseModel):
    id: int
    packs_rest: float | None
    units_rest: float | None


class DrugReportSchema(BaseModel):
    drugs_report: list[DrugReportItemSchema]


class Report1VetBSchema(BaseModel):
    vet1B_report: list[Report1VetBItemSchema]
