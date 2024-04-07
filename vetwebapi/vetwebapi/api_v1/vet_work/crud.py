import csv
from io import StringIO
from operator import and_

from fastapi import File, UploadFile
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import Disease

# Create
async def create_disease(session: AsyncSession, name: str) -> None:
    new_disease = Disease(name=name)
    session.add(new_disease)
    await session.commit()


# Read
async def read_diseases(session: AsyncSession) -> list[Disease]:
    stmt = select(Disease).order_by(Disease.name)
    return list(await session.scalars(stmt))


    