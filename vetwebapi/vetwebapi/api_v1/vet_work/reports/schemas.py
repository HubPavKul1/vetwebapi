from datetime import date

from pydantic import BaseModel

from api_v1.drug.reports.schemas import DateRangeIn



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
