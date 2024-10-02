from core.models import CatalogDrug, DrugInMovement

from .schemas import CatalogDrugSchema, CatalogDrugDetail, CatalogDrugDetails


async def serialize_catalog_drug(drug: CatalogDrug) -> CatalogDrugSchema:
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


async def serialize_catalog_drug_detail(drug: DrugInMovement) -> CatalogDrugDetail:
    return CatalogDrugDetail(
        catalog_drug_id=drug.catalog_drug_id,
        operation_date=drug.drug_movement.operation_date,
        packs_amount=drug.packs_amount,
        units_amount=drug.units_amount,
    )


async def serialize_catalog_drug_details(drugs: list[DrugInMovement]) -> CatalogDrugDetails:
    drugs: list[DrugInMovement] = [await serialize_catalog_drug_detail(drug=drug) for drug in drugs]
    return CatalogDrugDetails(catalog_drugs=drugs)
