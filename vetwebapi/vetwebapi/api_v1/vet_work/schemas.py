from datetime import date

from pydantic import BaseModel, ConfigDict

from vetwebapi.api_v1.company.employee.schemas import EmployeeSchema
from vetwebapi.api_v1.drug.receipts.schemas import DrugInMovementSchema


class DiseaseIn(BaseModel):
    name: str


class DiseaseOut(DiseaseIn):
    id: int

    model_config = ConfigDict(from_attributes=True)


class Diseases(BaseModel):
    diseases: list[DiseaseOut]


class VetWorkIn(BaseModel):
    work_type_id: int
    vetwork_date: date
    is_state_assignment: bool = False
    is_primary: bool = True
    clinic_id: int
    diseases: list[int]
    doctors: list[int]
    

class DiagnosticIn(VetWorkIn):
    biomaterial_id: int | None = None
    biomaterial_package_id: int | None = None
    biomaterial_fixation_id: int | None = None
    diagnostic_method_id: int


class AnimalInVetWorkIn(BaseModel):
    animal_id: int
    dosage: float | None = None
    is_positive: bool = False

class AnimalInVetWorkSchema(AnimalInVetWorkIn):
    animal_group: str
    species: str
    gender: str
    date_of_birth: date
    nickname: str
    identification: str
    is_active: bool = True

class VaccinationSchema(BaseModel):
    work_type: str
    vetwork_date: date
    diseases: list[DiseaseOut]
    is_primary: bool
    clinic: str

class DiagnosticSchema(VaccinationSchema):
    biomaterial: str | None = None
    biomaterial_fixation: str | None = None
    biomaterial_package: str | None = None
    diagnostic_method: str

class VaccinationDetail(VaccinationSchema):
    animals: list[AnimalInVetWorkSchema] = []
    doctors: list[EmployeeSchema] = []
    drug: DrugInMovementSchema | None = None


class BaseVetWorkSchema(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)

class BiomaterialFixations(BaseModel):
    biomaterial_fixations: list[BaseVetWorkSchema]

class BiomaterialPackages(BaseModel):
    biomaterial_packages: list[BaseVetWorkSchema]

class Biomaterials(BaseModel):
    biomaterials: list[BaseVetWorkSchema]

class DiagnosticMethods(BaseModel):
    diagnostic_methods: list[BaseVetWorkSchema]

class WorkTypes(BaseModel):
    work_types: list[BaseVetWorkSchema]



