from datetime import date

from pydantic import BaseModel, ConfigDict


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
    total_count: int
    page: int
    per_page: int
