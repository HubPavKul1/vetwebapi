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
    VaccinationDetail,
    )

from vetwebapi.api_v1.company.serializers import serialize_employee
from vetwebapi.api_v1.company.employee.schemas import EmployeeSchema


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
    

async def serialize_animal_in_vetwork(item: AnimalInVetWork) -> AnimalInVetWorkSchema:
    return AnimalInVetWorkSchema(
        animal_id=item.animal.id,
        dosage=item.dosage,
        is_positive=item.is_positive,
        animal_group=item.animal.species.animal_group.name,
        species=item.animal.species.name,
        gender=item.animal.gender.name,
        date_of_birth=item.animal.date_of_birth,
        nickname=item.animal.nickname,
        identification=item.animal.identification,
        is_active=item.animal.is_active,

    )   

async def serialize_animals_in_vetwork(items: list[AnimalInVetWork]) -> list[AnimalInVetWorkSchema]:
    return [await serialize_animal_in_vetwork(item) for item in items]


async def serialize_doctors_in_vetwork(items: list[DoctorInVetWork]) -> list[EmployeeSchema]:
    return [await serialize_employee(item.doctor) for item in items]