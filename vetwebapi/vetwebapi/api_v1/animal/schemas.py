from pydantic import BaseModel, ConfigDict


class AnimalIn(BaseModel):
    species_id: int
    usage_type_id: int
    gender_id: int
    date_of_birth: str
    nickname: str
    identification: str
    
class AnimalSchema(BaseModel):
    id: int
    species: str
    usage_type: str
    gender: str
    date_of_birth: str
    nickname: str
    identification: str