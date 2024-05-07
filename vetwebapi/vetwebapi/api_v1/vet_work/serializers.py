from vetwebapi.core.models import VetWork, DiseaseInVetWork

from .schemas import VaccinationSchema, DiagnosticSchema, DiseaseOut, VetWorks


async def serialize_vaccination(vaccination: VetWork) -> VaccinationSchema:
    diseases = vaccination.diseases_details
    disease_schemas = [await serialize_disease_in_vetwork(disease) for disease in diseases]
    return VaccinationSchema(
        id=vaccination.id,
        work_type=vaccination.work_type.name,
        vetwork_date=vaccination.vetwork_date,
        diseases=disease_schemas,
        clinic=vaccination.clinic.short_name,
    )
    
    
async def serialize_disease_in_vetwork(disease: DiseaseInVetWork) -> DiseaseOut:
    return DiseaseOut(disease)


async def serialize_vaccinations(vaccinations: list[VetWork]) -> VetWorks:
    vaccination_schemas = [await serialize_vaccination(vaccination=vaccination) for vaccination in vaccinations]
    return VetWorks(vetworks=vaccination_schemas)
    
    