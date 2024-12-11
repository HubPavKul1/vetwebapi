from datetime import date

from pydantic import BaseModel, ConfigDict


class DrugMovementIn(BaseModel):
    operation_date: date


class DrugMovementOut(DrugMovementIn):
    id: int

    model_config = ConfigDict(from_attributes=True)


class DrugInMovementIn(BaseModel):
    catalog_drug_id: int
    packs_amount: int
    units_amount: float
    place_of_administration: str | None = None
    administration_method: str | None = None


class DrugInMovementSchema(BaseModel):
    id: int
    name: str
    diseases: list[str]
    batch: str
    control: str
    production_date: date
    expiration_date: date
    # accounting_unit: str
    packs_amount: int
    units_amount: float
    drug_manufacturer: str
    drug_dosage: str
    administration_method: str | None = None
    place_of_administration: str | None = None
    disposal_method: str
    packing: float


class DrugMovementDetail(DrugMovementOut):
    drugs: list[DrugInMovementSchema] | None = None


class DrugMovements(BaseModel):
    drug_movements: list[DrugMovementDetail]
    total_count: int
    page: int
    per_page: int
