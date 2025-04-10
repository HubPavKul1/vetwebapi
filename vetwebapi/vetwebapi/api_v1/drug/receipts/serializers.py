from core.models import DrugInMovement, DrugMovement

from ..serializers import get_disease_names
from .schemas import DrugInMovementSchema, DrugMovementDetail


async def serialize_drug_in_movement(item: DrugInMovement) -> DrugInMovementSchema:
    diseases = await get_disease_names(drug=item.catalog_drug.drug)

    return DrugInMovementSchema(
        id=item.catalog_drug_id,
        diseases=diseases,
        drug_manufacturer=item.catalog_drug.drug.drug_manufacturer.name,
        drug_dosage=item.catalog_drug.drug.dosage.name,
        administration_method=item.administration_method,
        place_of_administration=item.place_of_administration,
        disposal_method=item.catalog_drug.drug.disposal_method.name,
        packing=item.catalog_drug.packing,
        name=item.catalog_drug.drug.name,
        batch=item.catalog_drug.batch,
        control=item.catalog_drug.control,
        production_date=item.catalog_drug.production_date,
        expiration_date=item.catalog_drug.expiration_date,
        accounting_unit=item.catalog_drug.drug.accounting_unit.name,
        packs_amount=item.packs_amount,
        units_amount=item.units_amount,
    )


async def serialize_drug_movement_card(
    drug_movement: DrugMovement,
) -> DrugMovementDetail:
    drugs = drug_movement.catalog_drugs_details
    if drugs:
        drugs = [await serialize_drug_in_movement(drug) for drug in drugs]
    return DrugMovementDetail(
        id=drug_movement.id, operation_date=drug_movement.operation_date, drugs=drugs
    )
