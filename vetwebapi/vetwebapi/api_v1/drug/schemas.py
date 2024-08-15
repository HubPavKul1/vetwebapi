from pydantic import BaseModel, ConfigDict


# Drug
class DrugIn(BaseModel):
    diseases: list[int]
    budget_id: int
    drug_manufacturer_id: int
    accounting_unit_id: int
    disposal_method_id: int
    dosage_id: int
    name: str
    packing: int
    image: str | None = None
    instruction: str | None = None


class DrugSchema(BaseModel):
    id: int
    diseases: list[str]
    budget: str
    drug_manufacturer: str
    accounting_unit: str
    disposal_method: str
    dosage: str
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
    diseases: list[str]
    image: str | None = None
    instruction: str | None = None


class Drugs(BaseModel):
    drugs: list[DrugCard]


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


class DisposalMethods(BaseModel):
    disposal_methods: list[BaseDrugSchema]


class Dosages(BaseModel):
    dosages: list[BaseDrugSchema]


class PlacesOfAdministration(BaseModel):
    places_of_administration: list[BaseDrugSchema]


class AdministrationMethods(BaseModel):
    administration_methods: list[BaseDrugSchema]


class DrugName(BaseModel):
    id: int
    name: str


class DrugNames(BaseModel):
    drugs: list[DrugName]
