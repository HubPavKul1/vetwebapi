from core.models import Drug

from .schemas import DrugCard, DrugName, DrugSchema


async def serialize_drug(drug: Drug) -> DrugSchema:
    diseases = await get_disease_names(drug=Drug)
    return DrugSchema(
        id=drug.id,
        diseases=diseases,
        budget=drug.budget.name,
        drug_manufacturer=drug.drug_manufacturer.name,
        accounting_unit=drug.accounting_unit.name,
        disposal_method=drug.disposal_method.name,
        dosage=drug.dosage.name,
        name=drug.name,
        packing=drug.packing,
        image=drug.image,
        instruction=drug.instruction,
    )


async def get_disease_names(drug: Drug) -> list[str]:
    return [item.disease.name for item in drug.diseases_details]


# Function to serialize data for drug card
async def serialize_drug_card(drug: Drug):
    drug_manufacturer = drug.drug_manufacturer.name
    diseases = await get_disease_names(drug=drug)

    return DrugCard(
        id=drug.id,
        name=drug.name,
        diseases=diseases,
        drug_manufacturer=drug_manufacturer,
        image=drug.image,
        instruction=drug.instruction,
    )


async def serialize_drug_name(drug: Drug):
    return DrugName(id=drug.id, name=drug.name)
