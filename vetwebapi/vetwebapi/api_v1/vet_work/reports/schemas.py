from pydantic import BaseModel
from datetime import date


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


class CompanyVetWork(BaseModel):
    company: str
    company_id: int
    vetwork_date: date | None = None
    work_type: str | None = None
    disease: str | None = None
    animals_count: float | None = None


class CompanyVetWorks(BaseModel):
    vetworks: list[CompanyVetWork]
