from asyncio import current_task
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_scoped_session,
    async_sessionmaker,
    create_async_engine,
)

from .settings import settings

db_url = settings.db_url


class DBManager:
    """Manager for db_connection"""

    def __init__(self, url: str, echo: bool = False):
        self.engine = create_async_engine(url=url, echo=echo)
        self.async_session_factory = async_sessionmaker(
            bind=self.engine,
            autoflush=False,
            autocommit=False,
            expire_on_commit=False,
            class_=AsyncSession,
        )

    def get_scoped_session(self):
        return async_scoped_session(
            session_factory=self.async_session_factory, scopefunc=current_task
        )

    async def scope_session_dependency(
        self,
    ) -> AsyncGenerator[async_scoped_session[AsyncSession], None]:
        session = self.get_scoped_session()
        yield session
        await session.close()

    async def session_dependency(self) -> AsyncGenerator[AsyncSession, None]:
        async with self.async_session_factory() as session:
            yield session
            await session.close()


db_manager = DBManager(url=db_url, echo=settings.db_echo)