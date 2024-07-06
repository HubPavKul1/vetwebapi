from vetwebapi.core.models import (
    VetWork, 
    AnimalInVetWork, 
    DoctorInVetWork,
    DrugInMovement,
    CompanyInVetWork,
    )


from .schemas import (
    VaccinationSchema, 
    DiagnosticSchema, 
    DiseaseOut, 
    VetWorks,
    AnimalInVetWorkSchema,
    VaccinationDetail,
    Diagnostics
    )

from vetwebapi.api_v1.company.serializers import serialize_employee, serialize_address
from vetwebapi.api_v1.drug.receipts.serializers import serialize_drug_in_movement
from vetwebapi.api_v1.company.schemas import CompanyCard, AddressSchema
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

async def serialize_diagnostic(diagnostic: VetWork) -> DiagnosticSchema:
    return DiagnosticSchema(
        id=diagnostic.id,
        work_type=diagnostic.work_type.name,
        vetwork_date=diagnostic.vetwork_date,
        is_primary=diagnostic.is_primary,
        diseases=await get_disease_names(vetwork=diagnostic),
        clinic=diagnostic.clinic.short_name,
        biomaterial=diagnostic.biomaterial.name,
        biomaterial_fixation=diagnostic.biomaterial_fixation.name,
        biomaterial_package=diagnostic.biomaterial_fixation.name,
        diagnostic_method=diagnostic.diagnostic_method.name
    )


async def get_disease_names(vetwork: VetWork) -> list[str]:
    return [item.disease.name for item in vetwork.diseases_details]


async def serialize_vaccinations(vaccinations: list[VetWork]) -> VetWorks:
    vaccination_schemas = [await serialize_vaccination(vaccination=vaccination) for vaccination in vaccinations]
    return VetWorks(vetworks=vaccination_schemas)

async def serialize_diagnostics(diagnostics: list[VetWork]) -> Diagnostics:
    diagnostic_schemas = [await serialize_diagnostic(diagnostic=diagnostic) for diagnostic in diagnostics]
    return Diagnostics(diagnostics=diagnostic_schemas)
    

async def serialize_animal_in_vetwork(item: AnimalInVetWork) -> AnimalInVetWorkSchema:
    return AnimalInVetWorkSchema(
        animal_id=item.animal.id,
        company_id=item.animal.company_id,
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

async def serialize_company_in_vetwork(item: CompanyInVetWork) -> CompanyCard:
    address = item.company.addresses
    employees = item.company.employees
    address_schema: AddressSchema = None
    employee_schema: EmployeeSchema = None
    if address:
        address_schema = await serialize_address(address=address)
    if employees:
        employee_schema = await serialize_employee(employee=employees[0])
    return CompanyCard(
        full_name=item.company.full_name,
        short_name=item.company.short_name,
        is_vet=item.company.is_vet,
        id=item.company.id,
        address=address_schema,
        employee=employee_schema
    )

async def serialize_animals_in_vetwork(items: list[AnimalInVetWork]) -> list[AnimalInVetWorkSchema]:
    return [await serialize_animal_in_vetwork(item) for item in items]


async def serialize_companies_in_vetwork(items: list[CompanyInVetWork]) -> list[CompanyCard]:
    return [await serialize_company_in_vetwork(item) for item in items]


async def serialize_doctors_in_vetwork(items: list[DoctorInVetWork]) -> list[EmployeeSchema]:
    return [await serialize_employee(item.doctor) for item in items]


async def serialize_vaccination_detail(
    vetwork: VetWork, 
    companies: list[CompanyInVetWork],
    animals: list[AnimalInVetWork], 
    doctors: list[DoctorInVetWork],
    drug: DrugInMovement = None,

    ) -> VaccinationDetail:

    animal_schemas = []
    doctor_schemas = []
    company_schemas = []
    drug_schema = None
    if companies:
        company_schemas: list[CompanyCard] = await serialize_companies_in_vetwork(items=companies)
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
        companies=company_schemas,
        animals=animal_schemas,
        doctors=doctor_schemas,
        drug=drug_schema,
    )

    
    