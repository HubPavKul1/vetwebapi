from vetwebapi.core.models import Drug
from .schemas import DrugSchema, DrugCard


async def serialize_drug(drug: Drug) -> DrugSchema:
    return DrugSchema(
        id=drug.id,
        disease=drug.disease.name,
        budget=drug.budget.name,
        drug_manufacturer=drug.drug_manufacturer.name,
        accounting_unit=drug.accounting_unit.name,
        name=drug.name,
        packing=drug.packing,
        image=drug.image,
        instruction=drug.instruction
    )


# Function to serialize data for drug card     
async def serialize_drug_card(drug: Drug):
    drug_manufacturer = drug.drug_manufacturer.name
        
    return DrugCard(
        id=drug.id,
        name=drug.name,
        drug_manufacturer=drug_manufacturer,
        image=drug.image,
        instruction=drug.instruction
    )    