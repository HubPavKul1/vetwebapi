from vetwebapi.core.models import (
    VetWork, 
    AnimalInVetWork, 
    DoctorInVetWork,
    )

from .schemas import (
    VaccinationSchema, 
    DiagnosticSchema, 
    DiseaseOut, 
    VetWorks,
    AnimalInVetWorkSchema,
    )


async def serialize_vaccination(vaccination: VetWork) -> VaccinationSchema:
    disease_names = [item.disease.name for item in vaccination.diseases_details]
    return VaccinationSchema(
        id=vaccination.id,
        work_type=vaccination.work_type.name,
        vetwork_date=vaccination.vetwork_date,
        is_primary=vaccination.is_primary,
        diseases=disease_names,
        clinic=vaccination.clinic.short_name,
    )
    
    
async def serialize_vaccinations(vaccinations: list[VetWork]) -> VetWorks:
    vaccination_schemas = [await serialize_vaccination(vaccination=vaccination) for vaccination in vaccinations]
    return VetWorks(vetworks=vaccination_schemas)
    

async def serialize_animal_in_vetwork(animal: AnimalInVetWork):
    pass    