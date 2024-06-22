from .schemas import DrugReportItemSchema


async def serialize_drug_in_report(item: tuple) -> DrugReportItemSchema:
    return DrugReportItemSchema(
        id=item[0],
        drug_name=item[1],
        batch=item[2],
        control=item[3],
        production_date=item[4],
        expiration_date=item[5],
        packs_start=item[6],
        units_start=item[7],
        packs_received=item[8],
        units_received=item[9],
        packs_spent=item[10],
        units_spent=item[11],
        disposed_units=item[12],
        packs_rest=item[13],
        units_rest=item[14]
    )