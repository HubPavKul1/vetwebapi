from .schemas import DiagnosticReportItemSchema, VetWorkReportSchema


async def serialize_diagnostic(item: tuple) -> DiagnosticReportItemSchema:
    return DiagnosticReportItemSchema(
        animal_group=item[0],
        disease=item[1],
        animal_count=item[2],
        positive_count=item[3]
    )

async def serialize_vetwork(item: tuple) -> VetWorkReportSchema:
    return VetWorkReportSchema(
        animal_group=item[0],
        disease=item[1],
        animal_count=item[2]
    )


