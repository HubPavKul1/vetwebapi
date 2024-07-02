from .schemas import DrugReportItemSchema, Report1VetBItemSchema


async def serialize_drug_in_report(item: tuple) -> DrugReportItemSchema:
    return DrugReportItemSchema(
        id=item[0],
        drug_name=item[1],
        batch=item[2],
        control=item[3],
        production_date=item[4],
        expiration_date=item[5],
        packing=item[6],
        packs_start=item[7],
        units_start=item[8],
        packs_received=item[9],
        units_received=item[10],
        packs_spent=item[11],
        units_spent=item[12],
        disposed_units=item[13],
        packs_rest=item[14],
        units_rest=item[15]
    )
    
async def serialize_drug_in_report_1B(item: tuple) -> Report1VetBItemSchema:
    return Report1VetBItemSchema(
        id=item[0],
        disease=item[1],
        drug_name=item[2],
        batch=item[3],
        packing=item[4],
        units_start=item[5],
        units_received=item[6],
        units_spent=item[7],
        animals_count=item[8],
        disposed_units=item[9],
        units_spent_disposed=item[10],
        units_rest=item[11]
    )