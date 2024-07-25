from core.models import CatalogDrug

from .schemas import CatalogDrugSchema


async def serialize_catalog_drug(drug: CatalogDrug):
    return CatalogDrugSchema(
        id=drug.id,
        drug_id=drug.drug.id,
        name=drug.drug.name,
        batch=drug.batch,
        control=drug.control,
        production_date=drug.production_date,
        expiration_date=drug.expiration_date,
        image=drug.drug.image,
    )
