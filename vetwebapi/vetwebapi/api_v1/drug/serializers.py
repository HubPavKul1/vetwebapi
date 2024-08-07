from core.models import Drug

from .schemas import DrugCard, DrugName, DrugSchema


async def serialize_drug(drug: Drug) -> DrugSchema:
    return DrugSchema(
        id=drug.id,
        disease=drug.disease.name,
        budget=drug.budget.name,
        drug_manufacturer=drug.drug_manufacturer.name,
        accounting_unit=drug.accounting_unit.name,
        disposal_method=drug.disposal_method.name,
        dosage=drug.dosage.name,
        place_of_administration=drug.place_of_administration.name,
        administration_method=drug.administration_method.name,
        name=drug.name,
        packing=drug.packing,
        image=drug.image,
        instruction=drug.instruction,
    )


# Function to serialize data for drug card
async def serialize_drug_card(drug: Drug):
    drug_manufacturer = drug.drug_manufacturer.name

    return DrugCard(
        id=drug.id,
        name=drug.name,
        drug_manufacturer=drug_manufacturer,
        image=drug.image,
        instruction=drug.instruction,
    )


async def serialize_drug_name(drug: Drug):
    return DrugName(id=drug.id, name=drug.name)
