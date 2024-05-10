from vetwebapi.core.models import (
    VetWork, 
    AnimalInVetWork, 
    DoctorInVetWork,
    DrugInMovement,
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
from vetwebapi.api_v1.drug.receipts.serializers import serialize_drug_in_movement
from vetwebapi.api_v1.company.employee.schemas import EmployeeSchema
from vetwebapi.api_v1.drug.receipts.schemas import DrugInMovementSchema


async def serialize_vaccination(vaccination: VetWork) -> VaccinationSchema:
    
    return VaccinationSchema(
        id=vaccination.id,
        work_type=vaccination.work_type.name,
        vetwork_date=vaccination.vetwork_date,
        is_primary=vaccination.is_primary,
        diseases=await get_disease_names(vetwork=vaccination),
        clinic=vaccination.clinic.short_name,
    )


async def get_disease_names(vetwork: VetWork) -> list[str]:
    return [item.disease.name for item in vetwork.diseases_details]


    
    
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


async def serialize_vaccination_detail(
    vetwork: VetWork, 
    animals: list[AnimalInVetWork], 
    doctors: list[DoctorInVetWork],
    drug: DrugInMovement = None,

    ) -> VaccinationDetail:

    animal_schemas = []
    doctor_schemas = []
    drug_schema = None
    if animals:
        animal_schemas: list[AnimalInVetWorkSchema] = await serialize_animals_in_vetwork(items=animals)
    if doctors:
        doctor_schemas: list[EmployeeSchema] = await serialize_doctors_in_vetwork(items=doctors)
    if drug:
        drug_schema: DrugInMovementSchema = await serialize_drug_in_movement(drug)

    return VaccinationDetail(
        id=vetwork.id,
        work_type=vetwork.work_type.name,
        vetwork_date=vetwork.vetwork_date,
        is_primary=vetwork.is_primary,
        diseases=await get_disease_names(vetwork=vetwork),
        clinic=vetwork.clinic.short_name,
        animals=animal_schemas,
        doctors=doctor_schemas,
        drug=drug_schema,
    )

    
    