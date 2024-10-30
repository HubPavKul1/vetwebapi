import asyncio
from typing import AsyncGenerator

import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from core.settings import settings
from core.models.base import Base
from core.database import DBManager, db_manager, db_url
from main import app

test_db_manager = DBManager(url=db_url, echo=True)
url = db_url


@pytest.fixture(scope="session")
async def prepare_db():
    async with test_db_manager.engine.begin() as conn:
        assert settings.mode == "test"
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    yield test_db_manager.engine
    async with test_db_manager.engine.begin() as conn:
        try:
            await conn.run_sync(Base.metadata.drop_all)
        finally:
            await conn.close()


async def override_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with test_db_manager.async_session_factory() as session:
        yield session


app.dependency_overrides[db_manager.scope_session_dependency] = override_async_session


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session")
async def ac() -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(
        app=app,
        base_url="http://test",
        headers={"Content-Type": "application/json", "accept": "application/json"},
    ) as ac:
        yield ac
