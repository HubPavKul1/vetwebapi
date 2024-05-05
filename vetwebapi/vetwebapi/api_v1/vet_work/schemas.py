from datetime import date

from pydantic import BaseModel, ConfigDict


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
    biomaterial_id: int | None = None
    biomaterial_package_id: int | None = None
    biomaterial_fixation_id: int | None = None
    diagnostic_method_id: int | None = None


class VetWorkSchema(BaseModel):
    pass




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



