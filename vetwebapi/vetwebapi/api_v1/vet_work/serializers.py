from api_v1.company.employee.schemas import EmployeeSchema
from api_v1.company.schemas import AddressSchema, CompanyCard
from api_v1.company.serializers import serialize_address, serialize_employee
from api_v1.drug.receipts.schemas import DrugInMovementSchema
from api_v1.drug.receipts.serializers import serialize_drug_in_movement
from core.models import (
    AnimalInVetWork,
    CompanyInVetWork,
    DoctorInVetWork,
    DrugInMovement,
    VetWork,
)

from .schemas import AnimalInVetWorkSchema, VetWorkDetail, VetWorks, VetWorkSchema


async def serialize_vetwork(vetwork: VetWork) -> VetWorkSchema:
    diseases = await get_disease_names(vetwork=vetwork)

    if vetwork.work_type_id == 2:
        laboratory = ""
        biomaterial = ""
        biomaterial_fixation = ""
        biomaterial_package = ""

        if vetwork.laboratory:
            laboratory = vetwork.laboratory.short_name
        if vetwork.biomaterial:
            biomaterial = vetwork.biomaterial.name
        if vetwork.biomaterial_fixation:
            biomaterial_fixation = vetwork.biomaterial_fixation.name
        if vetwork.biomaterial_package:
            biomaterial_package = vetwork.biomaterial_package.name

        return VetWorkSchema(
            id=vetwork.id,
            work_type=vetwork.work_type.name,
            vetwork_date=vetwork.vetwork_date,
            is_primary=vetwork.is_primary,
            is_state_assignment=vetwork.is_state_assignment,
            diseases=diseases,
            clinic=vetwork.clinic.short_name,
            laboratory=laboratory,
            biomaterial=biomaterial,
            biomaterial_fixation=biomaterial_fixation,
            biomaterial_package=biomaterial_package,
            diagnostic_method=vetwork.diagnostic_method.name,
        )

    return VetWorkSchema(
        id=vetwork.id,
        work_type=vetwork.work_type.name,
        vetwork_date=vetwork.vetwork_date,
        is_primary=vetwork.is_primary,
        is_state_assignment=vetwork.is_state_assignment,
        diseases=diseases,
        clinic=vetwork.clinic.short_name,
    )


async def get_disease_names(vetwork: VetWork) -> list[str]:
    return [item.disease.name for item in vetwork.diseases_details]


async def serialize_vetworks(
    vetworks: list[VetWork], total_count: int, page: int, per_page: int
) -> VetWorks:
    vetwork_schemas = [await serialize_vetwork(vetwork=vetwork) for vetwork in vetworks]
    return VetWorks(
        vetworks=vetwork_schemas, total_count=total_count, page=page, per_page=per_page
    )


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
    address_schema: AddressSchema | None = None
    employee_schema: EmployeeSchema | None = None
    if address:
        address_schema = await serialize_address(address=address)
    if employees:
        employee_schema = await serialize_employee(employee=employees[0])
    return CompanyCard(
        full_name=item.company.full_name,
        short_name=item.company.short_name,
        id=item.company.id,
        address=address_schema,
        employee=employee_schema,
    )


async def serialize_animals_in_vetwork(
    items: list[AnimalInVetWork],
) -> list[AnimalInVetWorkSchema]:
    return [await serialize_animal_in_vetwork(item) for item in items]


async def serialize_companies_in_vetwork(
    items: list[CompanyInVetWork],
) -> list[CompanyCard]:
    return [await serialize_company_in_vetwork(item) for item in items]


async def serialize_doctors_in_vetwork(
    items: list[DoctorInVetWork],
) -> list[EmployeeSchema]:
    return [await serialize_employee(item.doctor) for item in items]


async def serialize_vetwork_detail(
    vetwork: VetWork,
    companies: list[CompanyInVetWork],
    animals: list[AnimalInVetWork],
    doctors: list[DoctorInVetWork],
    drug: DrugInMovement | None = None,
    file_id: int | None = None,
) -> VetWorkDetail:
    vetwork_schema: VetWorkSchema = await serialize_vetwork(vetwork=vetwork)
    animal_schemas: list[AnimalInVetWorkSchema] = []
    doctor_schemas: list[EmployeeSchema] = []
    company_schemas: list[CompanyCard] = []
    drug_schema: DrugInMovementSchema | None = (
        await serialize_drug_in_movement(drug) if drug else None
    )
    if companies:
        company_schemas.extend(await serialize_companies_in_vetwork(items=companies))
    if animals:
        animal_schemas.extend((await serialize_animals_in_vetwork(items=animals)))
    if doctors:
        doctor_schemas.extend(await serialize_doctors_in_vetwork(items=doctors))
    # if drug:
    #     drug_schema: DrugInMovementSchema = await serialize_drug_in_movement(drug)

    return VetWorkDetail(
        **vetwork_schema.model_dump(),
        companies=company_schemas,
        animals=animal_schemas,
        doctors=doctor_schemas,
        drug=drug_schema,
        file_id=file_id,
    )
