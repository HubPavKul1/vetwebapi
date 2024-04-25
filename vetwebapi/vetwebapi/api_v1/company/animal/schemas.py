from datetime import date

from pydantic import BaseModel, ConfigDict


class AnimalIn(BaseModel):
    species_id: int
    usage_type_id: int
    gender_id: int
    date_of_birth: date
    nickname: str
    identification: str


class AnimalSchema(BaseModel):
    id: int
    animal_group: str
    species: str
    usage_type: str
    gender: str
    date_of_birth: date
    nickname: str
    identification: str
    is_active: bool = True


class AnimalUpdate(AnimalIn):
    is_active: bool


class AnimalUpdatePartial(BaseModel):
    species_id: int | None = None
    usage_type_id: int | None = None
    gender_id: int | None = None
    date_of_birth: str | None = None
    nickname: str | None = None
    identification: str | None = None
    is_active: bool = True


class BaseAnimalSchema(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class TypeOfFeedingSchemas(BaseModel):
    types_of_feeding: list[BaseAnimalSchema]


class AnimalGroupSchemas(BaseModel):
    animal_groups: list[BaseAnimalSchema]


class SpeciesSchemas(BaseModel):
    species: list[BaseAnimalSchema]


class GenderSchemas(BaseModel):
    genders: list[BaseAnimalSchema]


class UsageTypeSchemas(BaseModel):
    usage_types: list[BaseAnimalSchema]
