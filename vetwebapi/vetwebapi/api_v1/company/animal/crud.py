import csv
import codecs
import pandas as pd

from fastapi import UploadFile, File
from operator import and_

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from io import StringIO

from vetwebapi.core.models import (
    Animal,
    TypeOfFeeding,
    Species,
    Gender,
    UsageType,
    AnimalGroup,
)

from .schemas import AnimalIn, AnimalUpdate, AnimalUpdatePartial


# Create
async def create_type_of_feeding(session: AsyncSession, name: str) -> int:
    new_type_of_feeding = TypeOfFeeding(name=name.capitalize())
    session.add(new_type_of_feeding)
    await session.commit()
    await session.refresh(new_type_of_feeding)
    return new_type_of_feeding.id


async def create_usage_type(session: AsyncSession, name: str) -> int:
    new_usage_type = UsageType(name=name)
    session.add(new_usage_type)
    await session.commit()
    await session.refresh(new_usage_type)
    return new_usage_type.id


async def create_gender(session: AsyncSession, name: str) -> int:
    new_gender = Gender(name=name)
    session.add(new_gender)
    await session.commit()
    await session.refresh(new_gender)
    return new_gender.id


async def create_animal_group(session: AsyncSession, type_of_feeding_id: int, name: str) -> int:
    new_animal_group = AnimalGroup(type_of_feeding_id=type_of_feeding_id, name=name.capitalize())
    session.add(new_animal_group)
    await session.commit()
    await session.refresh(new_animal_group)
    return new_animal_group.id


async def create_species(session: AsyncSession, animal_group_id: int, name: str) -> int:
    new_species = Species(animal_group_id=animal_group_id, name=name.capitalize())
    session.add(new_species)
    await session.commit()
    await session.refresh(new_species)
    return new_species.id


async def create_animal(session: AsyncSession, company_id: int, body: AnimalIn) -> None:
    new_animal = Animal(**body.model_dump())
    new_animal.nickname = new_animal.nickname.capitalize()
    new_animal.company_id = company_id
    session.add(new_animal)
    await session.commit()
    
async def save_animals(session: AsyncSession, company_id: int, file: UploadFile = File(...)) -> None:
    contents = file.file.read()
    buffer = StringIO(contents.decode('utf-8'))
    csvReader = csv.reader(buffer)
    data = []
    for row in csvReader:
        data.append(row)
    
    buffer.close()
    file.file.close()
    print(data)
    

# Read
async def read_company_animals(session: AsyncSession, company_id: int) -> list[Animal | None]:
    stmt = (
        select(Animal)
        .where(and_(Animal.company_id == company_id, Animal.is_active == True))
        .order_by(Animal.nickname)
    )
    return list(await session.scalars(stmt))


async def read_animal_by_id(session: AsyncSession, animal_id: int) -> Animal | None:
    return await session.get(Animal, animal_id)


async def read_species(session: AsyncSession) -> list[Species]:
    stmt = select(Species).order_by(Species.name)
    return list(await session.scalars(stmt))


async def read_genders(session: AsyncSession) -> list[Gender]:
    stmt = select(Gender).order_by(Gender.name)
    return list(await session.scalars(stmt))


async def read_usage_types(session: AsyncSession) -> list[UsageType]:
    stmt = select(UsageType).order_by(UsageType.name)
    return list(await session.scalars(stmt))


# Update animal
async def update_animal(
    session: AsyncSession,
    animal: Animal,
    animal_update: AnimalUpdate | AnimalUpdatePartial,
    partial: bool = False,
) -> Animal:
    for name, value in animal_update.model_dump(exclude_unset=partial).items():
        setattr(animal, name, value)
    await session.commit()
    return animal


# Delete animal
async def delete_animal(session: AsyncSession, animal: Animal) -> None:
    await session.delete(animal)
    await session.commit()
