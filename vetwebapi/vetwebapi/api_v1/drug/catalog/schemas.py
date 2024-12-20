from datetime import date

from pydantic import BaseModel


class CatalogDrugIn(BaseModel):
    drug_id: int
    batch: str
    control: str
    packing: float
    production_date: date
    expiration_date: date


class CatalogDrugSchema(CatalogDrugIn):
    id: int
    name: str
    image: str | None = None


class CatalogDrugs(BaseModel):
    catalog_drugs: list[CatalogDrugSchema]


class Catalog(CatalogDrugs):
    total_count: int
    page: int
    per_page: int


class CatalogDrugDetail(BaseModel):
    catalog_drug_id: int
    operation_date: date
    packs_amount: float
    units_amount: float


class CatalogDrugDetails(BaseModel):
    catalog_drugs: list[CatalogDrugDetail]
