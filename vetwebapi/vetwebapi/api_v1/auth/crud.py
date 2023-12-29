from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import Role


async def read_roles(session: AsyncSession) -> list[Role]:
    stmt = select(Role)
    return list(await session.scalars(stmt))
