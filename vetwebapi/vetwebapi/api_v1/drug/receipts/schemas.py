from datetime import date

from pydantic import BaseModel, ConfigDict


# Drug Movement
class DrugMovementIn(BaseModel):
    operation_date: date


class DrugMovementOut(DrugMovementIn):
    id: int

    model_config = ConfigDict(from_attributes=True)


# class DrugMovements(BaseModel):
#     drug_movements: list[DrugMovementOut]
    

class DrugInMovementIn(BaseModel):
    catalog_drug_id: int
    packs_amount: int
    units_amount: float


class DrugInMovementSchema(BaseModel):
    id: int
    name: str
    batch: str
    control: str
    production_date: date
    expiration_date: date
    packs_amount: int
    units_amount: float

class DrugMovementDetail(DrugMovementOut):
    drugs: list[DrugInMovementSchema] | None = None


class DrugMovements(BaseModel):
    drug_movements: list[DrugMovementDetail]    