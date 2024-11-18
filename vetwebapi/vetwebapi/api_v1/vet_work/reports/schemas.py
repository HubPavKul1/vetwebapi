from pydantic import BaseModel


class VetWorkReportSchema(BaseModel):
    animal_group: str
    disease: str
    animal_count: int


class DiagnosticReportItemSchema(VetWorkReportSchema):
    positive_count: int


class DiagnosticReport(BaseModel):
    diagnostics: list[DiagnosticReportItemSchema]


class VetWorkReport(BaseModel):
    vaccinations: list[VetWorkReportSchema]
