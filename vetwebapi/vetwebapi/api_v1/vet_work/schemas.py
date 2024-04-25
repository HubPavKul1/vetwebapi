from pydantic import BaseModel, ConfigDict


class DiseaseIn(BaseModel):
    name: str


class DiseaseOut(DiseaseIn):
    id: int

    model_config = ConfigDict(from_attributes=True)


class Diseases(BaseModel):
    diseases: list[DiseaseOut]
