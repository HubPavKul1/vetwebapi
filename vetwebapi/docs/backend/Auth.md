# Аутентификация пользователя
## Библиотека [FastAPI Users](https://fastapi-users.github.io/fastapi-users/11.0/)
## Сайты [JWT](https://jwt.io/introduction), [Epoch Converter](https://www.epochconverter.com/)

* ### Установим библиотеку FastAPI Users через poetry
```
poetry add 'fastapi-users[sqlalchemy]'
```
## Создадим файлы: 
* ### core/models/users/role.py
```python

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .user import User


class Role(Base):
    __tablename__ = "roles"
    
    name: Mapped[str]
    
    users: Mapped[list["User"]] = relationship(back_populates="role")
    
    def __repr__(self) -> str:
        return self.name
```

* ### core/models/users/user.py
```python
from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, String
from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.database import db_manager
from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .role import Role

class User(Base):
    __tablename__ = "users"
    
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id", ondelete="CASCADE"))
    username: Mapped[str] = mapped_column(String(10), unique=True)
    email: Mapped[str | None] = mapped_column(String(320), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(1024), unique=True)
    is_active: Mapped[bool] = mapped_column(default=True)
    is_superuser: Mapped[bool] = mapped_column(default=False)
    is_verified: Mapped[bool] = mapped_column(default=False)
    
    role: Mapped["Role"] = relationship(back_populates="users")
    
    def __repr__(self) -> str:
        return self.username

async def get_user_db(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    yield SQLAlchemyUserDatabase(session, User)
```
* ### core/models/users/auth.py 
```python
from fastapi_users.authentication import CookieTransport, JWTStrategy, AuthenticationBackend

from vetwebapi.core.settings import settings

cookie_transport = CookieTransport(cookie_name="vetwebapi", cookie_max_age=3600)

SECRET = settings.secret

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)
```
* ### core/models/users/manager.py
```python
from typing import Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, IntegerIDMixin, schemas, models, exceptions

from .user import User, get_user_db

SECRET = "SECRET"


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    # async def on_after_forgot_password(
    #     self, user: User, token: str, request: Optional[Request] = None
    # ):
    #     print(f"User {user.id} has forgot their password. Reset token: {token}")

    # async def on_after_request_verify(
    #     self, user: User, token: str, request: Optional[Request] = None
    # ):
    #     print(f"Verification requested for user {user.id}. Verification token: {token}")
    
    
    async def create(
        self,
        user_create: schemas.UC,
        safe: bool = False,
        request: Optional[Request] = None,
    ) -> models.UP:
        """
        Create a user in database.

        Triggers the on_after_register handler on success.

        :param user_create: The UserCreate model to create.
        :param safe: If True, sensitive values like is_superuser or is_verified
        will be ignored during the creation, defaults to False.
        :param request: Optional FastAPI request that
        triggered the operation, defaults to None.
        :raises UserAlreadyExists: A user already exists with the same e-mail.
        :return: A new user.
        """
        await self.validate_password(user_create.password, user_create)

        existing_user = await self.user_db.get_by_email(user_create.email)
        if existing_user is not None:
            raise exceptions.UserAlreadyExists()

        user_dict = (
            user_create.create_update_dict()
            if safe
            else user_create.create_update_dict_superuser()
        )
        password = user_dict.pop("password")
        user_dict["hashed_password"] = self.password_helper.hash(password)
        user_dict["role_id"] = 1

        created_user = await self.user_db.create(user_dict)

        await self.on_after_register(created_user, request)

        return created_user


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
```
```python

    # Файл core/models/__init__.py
__all__ = ("Base", "Address", "City", "Company", "Employee", "Position", "Street", "Region", "District", "User", "Role", "auth_backend", "get_user_manager",)

from .base import Base
from .companies.address import Address
from .companies.city import City
from .companies.company import Company
from .companies.employee import Employee
from .companies.position import Position
from .companies.street import Street
from .companies.region import Region
from .companies.district import District
from .users.user import User
from .users.role import Role
from .users.auth import auth_backend
from .users.manager import get_user_manager
```
## Создадим пакет api_v1/auth/
## Создадим файлы:
* ### api_v1/auth/views.py
```python
from fastapi import APIRouter

from fastapi_users import FastAPIUsers
from vetwebapi.core.models import User, auth_backend, get_user_manager
from .schemas import UserCreate, UserRead


fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

router = APIRouter(tags=["Auth"])

router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
)

router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
)
```
* ### api_v1/auth/schemas.py
```python
from fastapi_users import schemas
from pydantic import ConfigDict


class UserRead(schemas.BaseUser[int]):
    id: int
    username: str
    email: str
    role_id: int
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
    
    model_config = ConfigDict(from_attributes=True)
    

class UserCreate(schemas.BaseUserCreate):
    username: str
    email: str
    password: str
    role_id: int
    is_active: bool | None = True
    is_superuser: bool | None = False
    is_verified: bool | None = False
```
* ### api_v1/auth/dependencies.py для доступа к роутам только аутентифицированным пользователям
```python
from .views import fastapi_users

current_user = fastapi_users.current_user()
current_active_user = fastapi_users.current_user(active=True)
current_superuser = fastapi_users.current_user(active=True, superuser=True)
```
* ### Подключим роуты в api_v1/__init__.py
```python
from fastapi import APIRouter, Depends

from .company.views import router as company_router
from .auth.views import router as auth_router
from .auth.dependencies import current_active_user


router = APIRouter()
router.include_router(company_router, prefix="/companies", dependencies=[Depends(current_active_user)])
router.include_router(auth_router)
```
