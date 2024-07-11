from datetime import date

from pydantic import BaseModel, ConfigDict

from vetwebapi.api_v1.company.employee.schemas import EmployeeSchema
from vetwebapi.api_v1.company.schemas import CompanyCard
from vetwebapi.api_v1.drug.receipts.schemas import DrugInMovementSchema


class DiseaseIn(BaseModel):
    name: str


class DiseaseOut(DiseaseIn):
    id: int

    model_config = ConfigDict(from_attributes=True)


class Diseases(BaseModel):
    diseases: list[DiseaseOut]


class VetWorkIn(BaseModel):
    vetwork_date: date
    is_state_assignment: bool = False
    is_primary: bool = True
    clinic_id: int
    diseases: list[int]
    doctors: list[int]

class VaccinationIn(VetWorkIn):
    work_type_id: int = 1


class VetWorkOut(BaseModel):
    id: int
    vetwork_date: date
    
    
class DiagnosticIn(VetWorkIn):
    work_type_id: int = 2
    laboratory_id: int | None = None
    biomaterial_id: int | None = None
    biomaterial_package_id: int | None = None
    biomaterial_fixation_id: int | None = None
    diagnostic_method_id: int


class CompanyInVetWorkIn(BaseModel):
    company_id: int


class AnimalInVetWorkIn(BaseModel):
    animal_id: int
    dosage: float | None = None
    is_positive: bool = False
    
    # model_config = ConfigDict(from_attributes=True)
    
    
    
class AnimalsInVetWorkIn(BaseModel):
    animals: list[AnimalInVetWorkIn]


class AnimalInVetWorkSchema(AnimalInVetWorkIn):
    animal_group: str
    company_id: int
    species: str
    gender: str
    date_of_birth: date
    nickname: str
    identification: str
    is_active: bool = True


class VetWorkSchema(BaseModel):
    id: int
    work_type: str
    vetwork_date: date
    diseases: list[str] | None = None
    is_primary: bool
    is_state_assignment: bool
    clinic: str
    laboratory: str | None = ""
    biomaterial: str | None = ""
    biomaterial_fixation: str | None = ""
    biomaterial_package: str | None = ""
    diagnostic_method: str | None = ""


class VetWorks(BaseModel):
    vetworks: list[VetWorkSchema]    


class VetWorkDetail(VetWorkSchema):
    companies: list[CompanyCard] = []
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



