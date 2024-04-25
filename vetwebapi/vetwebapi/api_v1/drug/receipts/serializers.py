from vetwebapi.core.models import DrugMovement, DrugInMovement

from .schemas import DrugInMovementSchema


async def serialize_drug_in_movement(item: DrugInMovement) -> DrugInMovementSchema:
    return DrugInMovementSchema(
        id=item.catalog_drug.id,
        name=item.catalog_drug.drug.name,
        batch=item.catalog_drug.batch,
        control=item.catalog_drug.control,
        production_date=item.catalog_drug.production_date,
        expiration_date=item.catalog_drug.expiration_date,
        packs_amount=item.packs_amount,
        units_amount=item.units_amount,
    )
