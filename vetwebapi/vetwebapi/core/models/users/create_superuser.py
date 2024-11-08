import contextlib

from .user import get_user_db, User
from api_v1.auth.schemas import UserCreate
from core.settings import settings
from .manager import get_user_manager, UserManager
from fastapi_users.exceptions import UserAlreadyExists
from sqlalchemy.ext.asyncio import AsyncSession


default_username = settings.su_name
default_email = settings.su_email
default_role_id = 1
default_password = settings.su_pass
default_is_active = True
default_is_superuser = True
default_is_verified = True

get_user_db_context = contextlib.asynccontextmanager(get_user_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)


async def create_user(user_manager: UserManager, user_create: UserCreate) -> User:
    user = await user_manager.create(user_create=user_create, safe=False)
    return user


async def create_superuser(
    session: AsyncSession,
    username: str = default_username,
    email: str = default_email,
    role_id: int = default_role_id,
    password: str = default_password,
    is_active: bool = default_is_active,
    is_superuser: bool = default_is_superuser,
    is_verified: bool = default_is_verified,
):
    user_create = UserCreate(
        username=username,
        email=email,
        role_id=role_id,
        password=password,
        is_active=is_active,
        is_superuser=is_superuser,
        is_verified=is_verified,
    )
    try:
        async with get_user_db_context(session) as user_db:
            async with get_user_manager_context(user_db) as user_manager:
                return await create_user(user_manager=user_manager, user_create=user_create)
    except UserAlreadyExists:
        print(f"User {email} already exists")
        raise
