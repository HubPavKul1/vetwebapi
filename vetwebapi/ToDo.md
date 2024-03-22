# Vetwebapi
## Приложение на [FastAPI](https://fastapi.tiangolo.com/) для ветеринарной работы
* ### Создадим папку для проекта vetwebapi
* ### Создадим проект с помощью [poetry](https://python-poetry.org/)
> poetry new vetwebapi

### Если проект клонировали с репозитория надо удалить poetry.lock

### Структура проекта:

```
└── vetwebapi
    ├── poetry.lock
    ├── pyproject.toml
    ├── README.md
    ├── tests
    │   └── __init__.py
    ├── ToDo.md
    └── vetwebapi
        └── __init__.py
```

* ### Перейдем в папку с проектом
> cd vetwebapi

* ### Создадим виртуальное окружение в проекте 
```
poetry config virtualenvs.in-project true

poetry install
```
* ### Добавим необходимые зависимости

```
poetry add fastapi sqlalchemy uvicorn psycopg2-binary alembic pydantic pydantic-settings python-dotenv asyncpg python-multipart python-slugify werkzeug
```
```
[tool.poetry.dependencies]
python = "^3.11"
fastapi = "^0.105.0"
sqlalchemy = "^2.0.23"
uvicorn = "^0.24.0.post1"
psycopg2-binary = "^2.9.9"
alembic = "^1.13.0"
pydantic = "^2.5.2"
pydantic-settings = "^2.1.0"
python-dotenv = "^1.0.0"
asyncpg = "^0.29.0"
python-multipart = "^0.0.6"
python-slugify = "^8.0.1"
werkzeug = "^3.0.1"
```

```
poetry add --group=dev flake8 pytest black isort factory-boy faker pytest-asyncio flake8-bugbear flake8-pie mypy mypy-extensions pytest-dotenv pytest-cov
```
```
[tool.poetry.group.dev.dependencies]
flake8 = "^6.1.0"
pytest = "^7.4.3"
black = "^23.12.0"
isort = "^5.13.2"
factory-boy = "^3.3.0"
faker = "^21.0.0"
pytest-asyncio = "^0.23.2"
flake8-bugbear = "^23.12.2"
flake8-pie = "^0.16.0"
mypy = "^1.7.1"
mypy-extensions = "^1.0.0"
pytest-dotenv = "^0.5.2"
pytest-cov = "^4.1.0"
```
* ### Добавим файл docker-compose.yml
```
version: '3.3'
services:
  # app:
  #   container_name: "vetwebapi"
  #   build: .
  #   stop_signal: SIGKILL
  #   env_file:
  #     - .env
  #   ports:
  #     - "8000:8000"
  #   # volumes:
  #   #   - ./blog_project/images/:/blog_project/images:rw
  #   depends_on:
  #     - db
  #   networks:
  #     - network

  # nginx:
  #   container_name: "nginx"
  #   restart: always
  #   build: ./blog_project/frontend
  #   ports:
  #     - "80:80"
  #   volumes:
  #     - ./blog_project/images:/usr/share/nginx/html/images:rw

  #   networks:
  #     - network
  #   depends_on:
  #     - app

  db:
    image: postgres:15.3-alpine3.18
    container_name: "db"
    restart: always
    env_file:
      - .env
    ports:
      - "5432:5432"
    command: postgres -c log_destination=stderr -c logging_collector=on -c log_directory='logs'
    # volumes:
    #   - ./db/:/var/lib/postgresql/data
    networks:
      - network
  
  # test_db:
  #   image: postgres:15.3-alpine3.18
  #   container_name: "test_db"
  #   restart: always
  #   env_file:
  #     - ./blog_project/.test.env
  #   ports:
  #     - "5433:5432"
  #   networks:
  #     - network

networks:
  network:
    driver: bridge
```
* ### Добавим .env и .dev.env файл в корень проекта
```
.env

DB_USER=admin
DB_PASS=admin
DB_NAME=vetwebapi_db
DB_HOST=db
DB_PORT=5432
SECRET=secret
MODE=prod

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=vetwebapi_db
```
```
.dev.env

DB_USER=admin
DB_PASS=admin
DB_NAME=vetwebapi_db
DB_HOST=localhost
DB_PORT=5432
SECRET=secret
MODE=dev

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=vetwebapi_db
```
## Инициируем алембик в корне проекта:
```
PS D:\VscodeProjects\vetwebapi\vetwebapi> poetry shell
```
```
(vetwebapi-py3.11) PS D:\VscodeProjects\vetwebapi\vetwebapi> alembic init migrations
```

* ### Создадим в папке vetwebapi/vetwebapi/ пакеты: api_v1/, core/, utils/
* ### В пакет core/ добавим пакет models/, файлы: settings.py, database.py
* ### В пакет models/ добавим папки с моделями проекта: animals/, companies/, drugs/  

## Настройка проекта и алембик
```python
# Файл /vetwebapi/core/settings.py

from pathlib import Path

from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    api_v1_prefix: str = "/api"

    db_user: str
    db_pass: str
    db_name: str
    db_host: str
    db_port: int
    secret: str
    mode: str

    postgres_user: str
    postgres_password: str
    postgres_db: str
    db_echo: bool = True

    @property
    def db_url(self):
        return f"postgresql+asyncpg://{self.db_user}:{self.db_pass}@{self.db_host}:{self.db_port}/{self.db_name}"

    class Config:
        # env_file = ".env"
        env_file = ".dev.env"
        env_file_encoding = "utf-8"


# settings = Settings(_env_file=f"{BASE_DIR}/.env", _env_file_encoding="utf-8")
settings = Settings(_env_file=f"{BASE_DIR}/.dev.env", _env_file_encoding="utf-8")
```
```python
# Файл /vetwebapi/core/database.py

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
```
### Файл alembic.ini
```python
# A generic, single database configuration.

[alembic]
# path to migration scripts
script_location = migrations

# template used to generate migration file names; The default value is %%(rev)s_%%(slug)s
# Uncomment the line below if you want the files to be prepended with date and time
# see https://alembic.sqlalchemy.org/en/latest/tutorial.html#editing-the-ini-file
# for all available tokens
file_template = %%(year)d_%%(month).2d_%%(day).2d_%%(hour).2d%%(minute).2d-%%(rev)s_%%(slug)s

# sys.path path, will be prepended to sys.path if present.
# defaults to the current working directory.
prepend_sys_path = .

# timezone to use when rendering the date within the migration file
# as well as the filename.
# If specified, requires the python>=3.9 or backports.zoneinfo library.
# Any required deps can installed by adding `alembic[tz]` to the pip requirements
# string value is passed to ZoneInfo()
# leave blank for localtime
# timezone =

# max length of characters to apply to the
# "slug" field
# truncate_slug_length = 40

# set to 'true' to run the environment during
# the 'revision' command, regardless of autogenerate
# revision_environment = false

# set to 'true' to allow .pyc and .pyo files without
# a source .py file to be detected as revisions in the
# versions/ directory
# sourceless = false

# version location specification; This defaults
# to migrations/versions.  When using multiple version
# directories, initial revisions must be specified with --version-path.
# The path separator used here should be the separator specified by "version_path_separator" below.
# version_locations = %(here)s/bar:%(here)s/bat:migrations/versions

# version path separator; As mentioned above, this is the character used to split
# version_locations. The default within new alembic.ini files is "os", which uses os.pathsep.
# If this key is omitted entirely, it falls back to the legacy behavior of splitting on spaces and/or commas.
# Valid values for version_path_separator are:
#
# version_path_separator = :
# version_path_separator = ;
# version_path_separator = space
version_path_separator = os  # Use os.pathsep. Default configuration used for new projects.

# set to 'true' to search source files recursively
# in each "version_locations" directory
# new in Alembic version 1.10
# recursive_version_locations = false

# the output encoding used when revision files
# are written from script.py.mako
# output_encoding = utf-8

sqlalchemy.url = postgresql+asyncpg://%(db_user)s:%(db_pass)s@%(db_host)s:5432/%(db_name)s


[post_write_hooks]
# post_write_hooks defines scripts or Python functions that are run
# on newly generated revision scripts.  See the documentation for further
# detail and examples

# format using "black" - use the console_scripts runner, against the "black" entrypoint
hooks = black
black.type = console_scripts
black.entrypoint = black
black.options = -l 79 REVISION_SCRIPT_FILENAME

# lint with attempts to fix using "ruff" - use the exec runner, execute a binary
# hooks = ruff
# ruff.type = exec
# ruff.executable = %(here)s/.venv/bin/ruff
# ruff.options = --fix REVISION_SCRIPT_FILENAME

# Logging configuration
[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = console
qualname =

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
```
### Файл migrations/env.py
```python
import asyncio
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

from vetwebapi.core.models import Base
from vetwebapi.core.database import db_url

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.
config.set_main_option("sqlalchemy.url", db_url)

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """In this scenario we need to create an Engine
    and associate a connection with the context.

    """

    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    asyncio.run(run_async_migrations())

    
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
```

## Модели проекта
### models/companies/
```python
# models/companies/address.py

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .region import Region
    from .district import District
    from .city import City
    from .company import Company
    from .street import Street


class Address(Base):
    """Класс Адрес"""

    __tablename__ = "addresses"

    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))
    region_id: Mapped[int] = mapped_column(ForeignKey("regions.id", ondelete="CASCADE"))
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id", ondelete="CASCADE"))
    city_id: Mapped[int] = mapped_column(ForeignKey("cities.id", ondelete="CASCADE"))
    street_id: Mapped[int] = mapped_column(ForeignKey("streets.id", ondelete="CASCADE"))
    house_number: Mapped[str] = mapped_column(String(5))
    phone_number1: Mapped[str]
    phone_number2: Mapped[str | None]

    company: Mapped["Company"] = relationship(back_populates="addresses")
    region: Mapped["Region"] = relationship(back_populates="addresses")
    district: Mapped["District"] = relationship(back_populates="addresses")
    city: Mapped["City"] = relationship(back_populates="addresses")
    street: Mapped["Street"] = relationship(back_populates="addresses")

```
```python
# models/companies/city.py

from typing import TYPE_CHECKING

from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .district import District
    from .street import Street
    from .address import Address


class City(Base):
    """Класс Город"""

    __tablename__ = "cities"

    district_id = mapped_column(ForeignKey("districts.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(100))

    district: Mapped["District"] = relationship(back_populates="cities")
    streets: Mapped[list["Street"]] = relationship(back_populates="city")
    addresses: Mapped[list["Address"]] = relationship(back_populates="city")

    def __repr__(self):
        return self.name
```
```python

# models/companies/company.py

from typing import TYPE_CHECKING

from slugify import slugify
from sqlalchemy import Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .address import Address
    from .employee import Employee


class Company(Base):
    """класс Компания"""

    __tablename__ = "companies"

    full_name: Mapped[str]
    short_name: Mapped[str]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    addresses: Mapped["Address"] = relationship(back_populates="company")
    employees: Mapped[list["Employee"]] = relationship(back_populates="company")

    @property
    def company_slug(self):
        return slugify(self.short_name)

    def __repr__(self) -> str:
        return self.short_name
```

```python

# models/companies/district.py

from typing import TYPE_CHECKING

from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .region import Region
    from .city import City
    from .address import Address


class District(Base):
    """Класс Район"""

    __tablename__ = "districts"

    region_id: Mapped[int] = mapped_column(ForeignKey("regions.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(100))

    region: Mapped["Region"] = relationship(back_populates="districts")
    cities: Mapped[list["City"]] = relationship(back_populates="district")
    addresses: Mapped[list["Address"]] = relationship(back_populates="district")

    def __repr__(self):
        return self.name
```

```python

# models/companies/employee.py

from typing import TYPE_CHECKING

from slugify import slugify
from sqlalchemy import Boolean, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base
from vetwebapi.utils import utils

if TYPE_CHECKING:
    from .company import Company
    from .position import Position


class Employee(Base):
    """Класс Работник"""

    __tablename__ = "employees"
    
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))
    position_id: Mapped[int] = mapped_column(ForeignKey("positions.id", ondelete="CASCADE"))
    lastname: Mapped[str] = mapped_column(String(50))
    firstname: Mapped[str] = mapped_column(String(30))
    patronymic: Mapped[str] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    
    company: Mapped["Company"] = relationship(back_populates="employees")
    position: Mapped["Position"] = relationship(back_populates="employees")
    
    @property
    def fullname(self):
        return utils.get_full_name(lastname=self.lastname, firstname=self.firstname, patronymic=self.patronymic,)
    
    @property
    def employee_slug(self):
        return slugify(utils.get_full_name(lastname=self.lastname, firstname=self.firstname, patronymic=self.patronymic,))
```

```python
# models/companies/position.py 


from typing import TYPE_CHECKING
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .employee import Employee


class Position(Base):
    """Класс Должность"""

    __tablename__ = "positions"

    name: Mapped[str] = mapped_column(String(100))

    employees: Mapped[list["Employee"]] = relationship(back_populates="position")

    def __repr__(self):
        return self.name
```

```python

# models/companies/region.py

from typing import TYPE_CHECKING
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .district import District
    from .address import Address

class Region(Base):
    """Класс область"""

    __tablename__ = "regions"

    name: Mapped[str] = mapped_column(String(100))

    districts: Mapped[list["District"]] = relationship(back_populates="region")
    addresses: Mapped[list["Address"]] = relationship(back_populates="region")

    def __repr__(self):
        return self.name

```
```python

# models/companies/street.py 

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .city import City
    from .address import Address


class Street(Base):
    """Класс улица"""

    __tablename__ = "streets"

    city_id: Mapped[int] = mapped_column(ForeignKey("cities.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(250))

    city: Mapped["City"] = relationship(back_populates="streets")
    addresses: Mapped[list["Address"]] = relationship(back_populates="street")

    def __repr__(self):
        return self.name
```


```python
# Файл core/models/__init__.py


__all__ = ("Base", "Address", "City", "Company", "Employee", "Position", "Street", "Region", "District",)

from .base import Base
from .companies.address import Address
from .companies.city import City
from .companies.company import Company
from .companies.employee import Employee
from .companies.position import Position
from .companies.street import Street
from .companies.region import Region
from .companies.district import District
```

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

### Файл main.py
```python
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.settings import settings
from vetwebapi.core.database import db_manager
from vetwebapi.utils import utils
from vetwebapi.api_v1 import router as router_v1
from vetwebapi.api_v1.auth import crud


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router_v1, prefix=settings.api_v1_prefix)


@app.get("/")
async def start(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    if not await crud.read_roles(session=session):
        await utils.fill_street_table(session=session)
        await utils.add_start_roles(session=session)
        return {"message": "Аll streets have been added!"}
    return {"message": "Hello, Dude!!!"}
```

## Фронтенд с [Jinja2](https://jinja.palletsprojects.com/en/3.1.x/)

* ### Добавим в проект библиотеку Jinja2
```
poetry add Jinja2
```
* ### Создадим пакет vetwebapi/vetwebapi/frontend/
* ### В ней создадим пакет pages/,  папки static/ и templates/
* ### Настроим путь к шаблонам и статическим файлам в settings.py
```python
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    api_v1_prefix: str = "/api"
    templates: Jinja2Templates = Jinja2Templates(
        directory=f"{BASE_DIR}/vetwebapi/frontend/templates"
    )
    staticfiles: StaticFiles = StaticFiles(directory=f"{BASE_DIR}/vetwebapi/frontend/static")

    db_user: str
    db_pass: str
    db_name: str
    db_host: str
    db_port: int
    secret: str
    mode: str

    postgres_user: str
    postgres_password: str
    postgres_db: str
    db_echo: bool = True

    @property
    def db_url(self):
        return f"postgresql+asyncpg://{self.db_user}:{self.db_pass}@{self.db_host}:{self.db_port}/{self.db_name}"

    class Config:
        # env_file = ".env"
        env_file = ".dev.env"
        env_file_encoding = "utf-8"


# settings = Settings(_env_file=f"{BASE_DIR}/.env", _env_file_encoding="utf-8")
settings = Settings(_env_file=f"{BASE_DIR}/.dev.env", _env_file_encoding="utf-8")
```
### и в файле main.py
```python
from fastapi import Depends, FastAPI

from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1 import router as router_v1
from vetwebapi.frontend import router as router_frontend
from vetwebapi.api_v1.auth import crud
from vetwebapi.core.database import db_manager
from vetwebapi.core.settings import settings
from vetwebapi.utils import utils

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", settings.staticfiles, name="static")
app.include_router(router_v1, prefix=settings.api_v1_prefix)
app.include_router(router_frontend)


@app.get("/")
async def start(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    if not await crud.read_roles(session=session):
        await utils.fill_street_table(session=session)
        await utils.add_start_roles(session=session)
        return {"message": "Аll streets have been added!"}
    return {"message": "Hello, Dude!!!"}
```

* ### В пакете pages/ создадим файл pages/index.py
```python
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from vetwebapi.core.settings import settings


router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return settings.templates.TemplateResponse("index.html", {"request": request})
```
* ### и файл pages/company_page.py
```python
from fastapi import APIRouter, Request, Depends, Form, Path
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from fastapi.responses import HTMLResponse, RedirectResponse
from vetwebapi.core.settings import settings
from vetwebapi.core.database import db_manager
from vetwebapi.api_v1.company import crud, dependencies
from vetwebapi.api_v1.company.views import get_companies, get_company_detail
from vetwebapi.api_v1.company.schemas import Companies, CompanyIn, CompanyDetail, AddressIn
from vetwebapi.core.models import Company


router = APIRouter(prefix="/companies")


@router.get("/", response_class=HTMLResponse)
async def companies(request: Request, companies: Companies = Depends(get_companies)):
    return settings.templates.TemplateResponse(
        "/companies/companies.html", {"request": request, "companies": companies.companies}
    )


@router.get("/add_new_company", response_class=HTMLResponse)
async def add_new_company(request: Request):
    return settings.templates.TemplateResponse("companies/add_company.html", {"request": request})


@router.post("/add_company")
async def add_company(
    request: Request,
    full_name: Annotated[str, Form(...)],
    short_name: Annotated[str, Form(...)],
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
):
    new_company_schema = CompanyIn(full_name=full_name, short_name=short_name)
    await crud.create_company(session=session, body=new_company_schema)
    redirect_url = request.url_for("companies")

    return RedirectResponse(redirect_url, status_code=302)


@router.get("/{company_id}/", response_class=HTMLResponse)
async def company_detail(request: Request, company: CompanyDetail = Depends(get_company_detail)):
    return settings.templates.TemplateResponse(
        "/companies/company_detail.html", {"request": request, "company": company}
    )


@router.get("/{company_id}/add_address", response_class=HTMLResponse)
async def add_address(
    request: Request,
    session: AsyncSession = Depends(db_manager.scope_session_dependency),
    company: CompanyDetail = Depends(get_company_detail),
):
    regions = await crud.read_regions(session=session)
    districts = await crud.read_districts(session=session)
    cities = await crud.read_cities(session=session)
    streets = await crud.read_streets(session=session)
    return settings.templates.TemplateResponse(
        "companies/add_address.html",
        {
            "request": request,
            "regions": regions,
            "districts": districts,
            "cities": cities,
            "streets": streets,
            "company": company,
        },
    )


@router.post("/{company_id}/add_address")
async def add_address(
    request: Request, session: AsyncSession = Depends(db_manager.scope_session_dependency)
):
    formdata = await request.form()
    street_id = int(formdata.get("street_id"))
    house_number = formdata.get("house_number")
    phone_number1 = formdata.get("phone_number1")
    phone_number2 = formdata.get("phone_number2")
    company_id = int(formdata.get("company_id"))

    address_schema = AddressIn(
        street_id=street_id,
        company_id=company_id,
        house_number=house_number,
        phone_number1=phone_number1,
        phone_number2=phone_number2,
    )

    redirect_url = request.url_for("company_detail", **{"company_id": company_id})
    await crud.create_address(session=session, body=address_schema)
    return RedirectResponse(redirect_url, status_code=302)
```
* ### зарегистрируем роуты в frontend/__init__.py
```python
from fastapi import APIRouter, Depends

from .pages.company_page import router as company_router
from .pages.index import router as index_router
from vetwebapi.api_v1.auth.dependencies import current_active_user


router = APIRouter(
    prefix="/pages",
    tags=["Pages"],
    # dependencies=[Depends(current_active_user)],
)


router.include_router(index_router)
router.include_router(company_router)
```
* ### и подключим их в main.py
```python
from fastapi import Depends, FastAPI

from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.api_v1 import router as router_v1
from vetwebapi.frontend import router as router_frontend
from vetwebapi.api_v1.auth import crud
from vetwebapi.core.database import db_manager
from vetwebapi.core.settings import settings
from vetwebapi.utils import utils

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", settings.staticfiles, name="static")
app.include_router(router_v1, prefix=settings.api_v1_prefix)
app.include_router(router_frontend)


@app.get("/")
async def start(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    if not await crud.read_roles(session=session):
        await utils.fill_street_table(session=session)
        await utils.add_start_roles(session=session)
        return {"message": "Аll streets have been added!"}
    return {"message": "Hello, Dude!!!"}
```

Доделать страницу компании, таблицу животных






# Создание проекта с помощью пакетного менеджера Yarn https://yarnpkg.com/
* ### Установка

* ### Установим npm
> sudo apt install npm

* ### Проверим наличие nvm
> ls -a | grep .nvm

* ### Если папки нет 
> git clone http://github.com/creationix/nvm.git .nvm

* ### Затем
>source ~/.nvm/nvm.sh

* ### Обновим nvm
> nvm install 20.11.0

* ### Установим yarn
> npm install -g yarn

* ### Текущая установленная версия yarn
> yarn -v

* ### Список доступных команд
> yarn help

```
  Usage: yarn [command] [flags]

  Displays help information.

  Options:

    --cache-folder <path>               specify a custom folder that must be used to store the yarn cache
    --check-files                       install will verify file tree of packages for consistency
    --cwd <cwd>                         working directory to use (default: D:\VscodeProjects\react\react_yarn)
    --disable-pnp                       disable the Plug'n'Play installation
    --emoji [bool]                      enable emoji in output (default: false)
    --enable-pnp, --pnp                 enable the Plug'n'Play installation
    --flat                              only allow one version of a package
    --focus                             Focus on a single workspace by installing remote copies of its sibling workspaces.
    --force                             install and build packages even if they were built before, overwrite lockfile     
    --frozen-lockfile                   don't generate a lockfile and fail if an update is needed
    --global-folder <path>              specify a custom folder to store global packages
    --har                               save HAR output of network traffic
    --https-proxy <host>
    --ignore-engines                    ignore engines check
    --ignore-optional                   ignore optional dependencies
    --ignore-platform                   ignore platform checks
    --ignore-scripts                    don't run lifecycle scripts
    --json                              format Yarn log messages as lines of JSON (see jsonlines.org)
    --link-duplicates                   create hardlinks to the repeated modules in node_modules
    --link-folder <path>                specify a custom folder to store global links
    --modules-folder <path>             rather than installing modules into the node_modules folder relative to the cwd, output them here
    --mutex <type>[:specifier]          use a mutex to ensure only one yarn instance is executing
    --network-concurrency <number>      maximum number of concurrent network requests
    --network-timeout <milliseconds>    TCP timeout for network requests
    --no-bin-links                      don't generate bin links when setting up packages
    --no-default-rc                     prevent Yarn from automatically detecting yarnrc and npmrc files
    --no-lockfile                       don't read or generate a lockfile
    --non-interactive                   do not show interactive prompts
    --no-node-version-check             do not warn when using a potentially unsupported Node version
    --no-progress                       disable progress bar
    --offline                           trigger an error if any required dependencies are not available in local cache
    --otp <otpcode>                     one-time password for two factor authentication
    --prefer-offline                    use network only if dependencies are not available in local cache
    --preferred-cache-folder <path>     specify a custom folder to store the yarn cache if possible
    --prod, --production [prod]
    --proxy <host>
    --pure-lockfile                     don't generate a lockfile
    --registry <url>                    override configuration registry
    -s, --silent                        skip Yarn console logs, other types of logs (script output) will be printed
    --scripts-prepend-node-path [bool]  prepend the node executable dir to the PATH in scripts
    --skip-integrity-check              run install without checking if node_modules is installed
    --strict-semver
    --update-checksums                  update package checksums from current repository
    --use-yarnrc <path>                 specifies a yarnrc file that Yarn should use (.yarnrc only, not .npmrc) (default: )
    -v, --version                       output the version number
    --verbose                           output verbose messages on internal operations
    -h, --help                          output usage information
  Commands:
    - access
    - add
    - audit
    - autoclean
    - bin
    - cache
    - check
    - config
    - create
    - exec
    - generate-lock-entry / generateLockEntry
    - global
    - help
    - import
    - info
    - init
    - install
    - licenses
    - link
    - list
    - login
    - logout
    - node
    - outdated
    - owner
    - pack
    - policies
    - publish
    - remove
    - run
    - tag
    - team
    - unlink
    - unplug
    - upgrade
    - upgrade-interactive / upgradeInteractive
    - version
    - versions
    - why
    - workspace
    - workspaces
```
* ### Создадим новый проект с компилятором vite https://vitejs.dev/

> yarn create vite


```
PS D:\VscodeProjects\react\react_yarn> yarn create vite
yarn create v1.22.21
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Installed "create-vite@5.1.0" with binaries:
      - create-vite
      - cva
√ Project name: ... cars-catalog
√ Select a framework: » React
√ Select a variant: » JavaScript

Scaffolding project in D:\VscodeProjects\react\react_yarn\cars-catalog...

Done. Now run:

  cd cars-catalog
  yarn
  yarn dev       

Done in 40.00s.
```
* ### Перейдем в директорию с проектом

> PS D:\VscodeProjects\react\react_yarn> cd cars-catalog

* ### Установка всех зависимостей из package.json

> yarn install или yarn

## В корне проекта создается файл yarn.lock

* ## Запуск проекта 
> yarn dev

## Обновление и удаление пакетов

Обновление пакетов происходит с помощью команды upgrade:

### Обновление пакетов

> yarn upgrade [package]

В данном примере мы обновим сразу несколько пакетов, записав их списком:

> yarn upgrade jquery fancybox

### Удаление пакетов

> yarn remove [package]

Например:

> yarn remove jquery

## Полезная ссылка по шрифтам https://gwfh.mranftl.com/fonts

### Home.jsx

```js
import styles from "./Home.module.css"

// Импортируем данные по машинам из файла cars.data.js
import { cars } from "./Cars.data"



function Home() {
  
    return (
      <div>
        <h1>Cars Catalog</h1>
        <div>
        // В цикле проверяем наличие карточек и отображаем карточки с данными из cars.data.js
            {cars.length ? cars.map(car =>(
                <div key={car.id} className={styles.item}>
                <div 
                className={styles.image} 
                style={{
                    backgroundImage: `url(${car.image})`,
                }}
                >
                </div>
                <div className={styles.info}>
                    <h2>{car.name}</h2>
                    <p>{new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }

                    ).format(car.price)}</p>
                    <button>Read more</button>
                </div>
            </div>

            ))
            : <p>There are no cars</p>
        }
            
        </div>       
      </div>
    )
  }
  
  export default Home
```
## Проведем декомпозицию 
* ### В папке home создадим новую папку car-item, в ней создадим файл CarItem.jsx и перенесем код с карточкой машины из Home.jsx

### CarItem.jsx
```js
import styles from "../Home.module.css"


function CarItem({ car }) {
    return (
        <div key={car.id} className={styles.item}>
            <div 
            className={styles.image} 
            style={{
                backgroundImage: `url(${car.image})`,
            }}
            >
            </div>
            <div className={styles.info}>
                <h2>{car.name}</h2>
                <p>{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }
                ).format(car.price)}</p>
                <button>Read more</button>
            </div>
        </div>        
    )
}

export default CarItem
```
### Home.jsx
```js
import { cars } from "./Cars.data"
import CarItem from "./car-item/CarItem"


function Home() {
  
    return (
      <div>
        <h1>Cars Catalog</h1>
        <div>
            {cars.length ? cars.map(car =>(
                <CarItem key={car.id} car={car} />
            ))
            : <p>There are no cars</p>
        }
        </div>
      </div>
    )
  }
  
  export default Home
```
### Можно поставить фильтр с кэшированием с использованием хука useMemo
```js
import { useMemo } from "react"
import { cars } from "./Cars.data"
import CarItem from "./car-item/CarItem"


function Home() {
    const filterCars = useMemo(
        () => cars.filter(car => car.price < 500000), []
    )

    return (
      <div>
        <h1>Cars Catalog</h1>
        <div>
            {filterCars.length ? filterCars.map(car =>(
                <CarItem key={car.id} car={car} />
            ))
            : <p>There are no cars</p>
        }
        </div>
      </div>
    )
  }
  
  export default Home
```

# Добавляем новый объект через форму
* ## создаем файл в папке home/create-car-form CreateCarForm.jsx
```js
import { useState } from "react" 
import styles from "./CreateCarForm.module.css"


const CreateCarForm = ({setCars}) => {
    const [name, setName] = useState("") 
    const [price, setPrice] = useState("") 
    const [image, setImage] = useState("") 

    const createCar = (e) => {
        e.preventDefault()    
        setCars(prev => [...prev, { id: prev.length + 1, name, price, image }])
    }
    
    return (
       <form className={styles.form}>
        <input 
            placeholder="Name" 
            onChange={e => setName(e.target.value)} 
            value={name} />
        <input 
            placeholder="Price"
            onChange={e => setPrice(e.target.value)} 
            value={price} 
        />
      
        <input 
            placeholder="Image"
            onChange={e => setImage(e.target.value)} 
            value={image}
        />
       

        <button className="btn" onClick={e => createCar(e)}>Create</button>
       </form>
    )
}

export default CreateCarForm
```
## файл Home.jsx
```js
import { useState } from "react"
import { cars as carsData} from "./cars.data.js"
import CarItem from "./car-item/CarItem"
import CreateCarForm from "./create-car-form/CreateCarForm"


function Home() {
  const [cars, setCars] = useState(carsData)
  console.log(cars)
    return (
      <div>
        <h1>Cars Catalog</h1>
          <CreateCarForm setCars={setCars}/>
        <div>
            {cars.length ? cars.map(car =>(
                <CarItem key={car.id} car={car} />
            ))
            : <p>There are no cars</p>
        }
        </div>
      </div>
    )
  }
  
  export default Home
```
### CreateCarForm.module.css
```css
.form {
    margin: 10px auto 30px;
}

.form input {
    padding: 5px 10px;
    border: none;
    outline: none;
    transition: border-color 0.4s ease;
    border: solid transparent;
    margin-bottom: 10px;
}

.form input:focus {
    border-color: aqua ;
}
```
* ## Рефакторим форму создания объекта
```js
import { useState } from "react" 
import styles from "./CreateCarForm.module.css"



const clearData = {
    name: "",
    price: "",
    image: "",
}

const CreateCarForm = ({ setCars }) => {
    const [data, setData] = useState(clearData) 
    
    const createCar = (e) => {
        e.preventDefault()  
    
        setCars(prev => [
            { 
              id: prev.length + 1,
              ...data, 
            }, 
            ...prev,
        ]),
    
        setData(clearData)
    }
   
    return (
       <form className={styles.form}>
          <input 
            placeholder="Name" 
            onChange={e => setData(prev => ({
                ...prev, name: e.target.value
            }))} 
            value={data.name}
          />
          <input 
            placeholder="Price"
            onChange={e => setData(prev => ({
                ...prev, price: e.target.value
            }))} 
            value={data.price} 
          />
          <input 
            placeholder="Image"
            onChange={e => setData(prev => ({
                ...prev, image: e.target.value
            }))} 
            value={data.image}
          />
       
          <button className="btn" onClick={e => createCar(e)}>Create</button>
       </form>
    )
}

export default CreateCarForm
```
## Можно установить json-server 
> npm install -g json-server
### Запустим сервер и базу данных
> json-server db.json -p 4200

### Получим данные о машинах с сервера с помощью useEffect()
```js
import { useEffect, useState } from "react"
import { cars as carsData} from "./cars.data.js"
import CarItem from "./car-item/CarItem"
import CreateCarForm from "./create-car-form/CreateCarForm"


function Home() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:4200/cars"
      )
      const data = await response.json()

      setCars(data)
    }
    fetchData()
  }, [])

    return (
      <div>
        <h1>Cars Catalog</h1>
          <CreateCarForm setCars={setCars}/>
        <div>
            {cars.length ? cars.map(car =>(
                <CarItem key={car.id} car={car} />
            ))
            : <p>There are no cars</p>
        }
        </div>
      </div>
    )
  }
  
  export default Home
```
### Устанавливаем axios https://axios-http.com/

> yarn add axios

### Вместо fetch пишем axios
```js
import axios from "axios"
import { useEffect, useState } from "react"
import { cars as carsData} from "./cars.data.js"
import CarItem from "./car-item/CarItem"
import CreateCarForm from "./create-car-form/CreateCarForm"


function Home() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:4200/cars"
      )
      
      setCars(response.data)
    }
    fetchData()
  }, [])

    return (
      <div>
        <h1>Cars Catalog</h1>
          <CreateCarForm setCars={setCars}/>
        <div>
            {cars.length ? cars.map(car =>(
                <CarItem key={car.id} car={car} />
            ))
            : <p>There are no cars</p>
        }
        </div>
      </div>
    )
  }
  
  export default Home
```
## Сервисы:
* ### В папке src создадим папку services, в ней файл car.service.js
```js
import axios from "axios"


export const CarService = {
    async getAll() {
      const response = await axios.get("http://localhost:4200/cars")
      return response.data
    },
}
```
### файл Home.jsx изменим:
```js
import { useEffect, useState } from "react"
// import { cars as carsData} from "./cars.data.js"
import CarItem from "./car-item/CarItem"
import CreateCarForm from "./create-car-form/CreateCarForm"
import { CarService } from "../../../services/car.service"


function Home() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await CarService.getAll()
      
      setCars(data)
    }
    fetchData()
  }, [])

    return (
      <div>
        <h1>Cars Catalog</h1>
          <CreateCarForm setCars={setCars}/>
        <div>
            {cars.length ? cars.map(car =>(
                <CarItem key={car.id} car={car} />
            ))
            : <p>There are no cars</p>
        }
        </div>
      </div>
    )
  }
  
  export default Home
```
## Роутер
### Установим react-router-dom https://reactrouter.com/en/main/start/tutorial
> yarn add react-router-dom

### Папке components создадим файл Router.jsx
```js
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./screens/home/Home"

const Router = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
    )
}

export default Router
```
### Файл main.jsx изменим:
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/screens/home/Home'
import "./assets/styles/global.css"
import Router from './components/Router'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
```

## Детальная страница товара 

### В car.service.js добавим сервис получения детальной страницы машины
```js
import axios from "axios"


export const CarService = {
    async getAll() {
      const response = await axios.get("http://localhost:4200/cars")
      return response.data
    },

    async getById(id) {
        const response = await axios.get(`http://localhost:4200/cars?id=${id}`)
        return response.data[0]
      },


}
```

### В папке screens создадим папку car-detail, в ней файл CarDetail.jsx
```js
import { useParams } from "react-router-dom"
import { CarService } from "../../../services/car.service"
import { useEffect, useState } from "react"
import CarItem from "../home/car-item/CarItem"

const CarDetail = () => {

    const {id} = useParams()
    const [car, setCar] = useState({})

    useEffect(() => {
        if(!id) return

        const fetchData = async () => {
          const data = await CarService.getById(id)
          
          setCar(data)
        }
        fetchData()
      }, [id])
    
    if (!car.name) return <p>Loading...</p>  

    return (
        <div>
          <CarItem car={car}/>
        </div>
    )
}

export default CarDetail
```
### Добавим route в файл Router.jsx
```js
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./screens/home/Home"
import CarDetail from "./screens/car-detail/CarDetail"

const Router = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CarDetail />} path="/car/:id" />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
    )
}

export default Router
```
### Ссылка на главную страницу используем Link из react-router-dom, чтобы страница не перезагружалась
```js
import { Link, useParams } from "react-router-dom"
import { CarService } from "../../../services/car.service"
import { useEffect, useState } from "react"
import CarItem from "../home/car-item/CarItem"

const CarDetail = () => {

    const {id} = useParams()
    const [car, setCar] = useState({})

    useEffect(() => {
        if(!id) return

        const fetchData = async () => {
          const data = await CarService.getById(id)
          
          setCar(data)
        }
        fetchData()
      }, [id])
    
    if (!car.name) return <p>Loading...</p>  
    
    return (
        <div>
          <Link to="/">Back</Link>
          <CarItem car={car}/>
        </div>
    )
}

export default CarDetail
```
### Ссылка на детальную страницу в файле CarItem.jsx используем Link из react-router-dom
```js
import styles from "../Home.module.css"
import { Link } from "react-router-dom"


function CarItem({ car }) {
    return (
        <div key={car.id} className={styles.item}>
            <div 
            className={styles.image} 
            style={{
                backgroundImage: `url(${car.image})`,
            }}
            >
            </div>
            <div className={styles.info}>
                <h2>{car.name}</h2>
                <p>{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }
                ).format(car.price)}</p>
                <Link className="btn" to={`/car/${car.id}`}>Read more</Link>
            </div>
        </div>        
    )
}

export default CarItem
```
### Изменим стили для кнопки в global.css
```css
.btn {
    display: flex; 
    justify-content: center;
    align-items: center;
    padding: 6px 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    cursor: pointer;
    margin-top: 8px;
    text-decoration: none;
    color: #111;
    background-color: #fff;
    max-width: 100px;
}
```
## Хук useRef


# React Query https://tanstack.com/query/v3/docs/framework/react/installation
```
yarn add react-query
```

* ## Подключаем к проекту
```jsx
// main.jsx

iimport React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom';

import "./assets/css/style.css";
import "./assets/css/bootstrap.css";
// import "./assets/css/animate.css";
// import "./assets/css/icomoon.css";
// import "./assets/css/magnific-popup.css"
// import "./assets/css/owl.carousel.min.css";
// import "./assets/css/owl.theme.default.min.css";
// import "./assets/css/flexslider.css";
// import "./assets/fonts/flaticon/font/flaticon.css";



import App from './App';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render( 
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
        
    </React.StrictMode>
       
)
```

```jsx
// файл Companies.jsx

import axios from "axios"
import { useState, useEffect } from "react"
import classes from "./company-card/CompanyCard.module.css"
import CompanyCard from "./company-card/CompanyCard"
import { CompanyService } from "./company.service"

import { Link } from "react-router-dom"
import CreateCompany from "./CreateCompany"
import { useQuery } from "react-query"


export default function Companies() {
    // const [companies, setCompanies] = useState([])
    const { data, isLoading, error } = useQuery(['companies'], () => CompanyService.getAll()
    )
    
    if(isLoading) return <p>Загрузка ...</p>
    // useEffect(() => {
    //     const fetchData = async () => {
    //     const data = await CompanyService.getAll()
    //       setCompanies(data)
    //     }
    //     fetchData()
    //   }, [])
    
    return (
  
            <div id="colorlib-services">
            <div className="container">
                <div className="row animate-box">
                    <CreateCompany />
                </div>
                <div className="row">
                    {data.length ? data.map(company =>(
                        <CompanyCard key={company.id} company={company} />
                    ))
                    : <p>There are no companies</p>
                    }
                </div>
            </div>
        </div>
        
    )
}
```


# React-hook-form  https://react-hook-form.com/get-started

```jsx

// CreateCompanyForm.jsx

import { useState, useEffect } from "react";
import styles from "./CreateCompanyForm.module.css"
import { CompanyService } from "../company.service";
import { useForm } from "react-hook-form"

export default function CreateCompanyForm({submitting}) {
    const [full_name, setFullName] = useState("")
    const [short_name, setShortName] = useState("")

    const { register, reset, handleSubmit, formState: {errors} } = useForm({
        mode: "onChange",
    })

    const createCompany = async (data) => {
        // e.preventDefault()

        console.log("data+++", data)
        console.log(data.full_name)

        // await CompanyService.createCompany(data.full_name, data.short_name)
        reset()
    }   

    // console.log(errors.full_name)
     

    return (

        <form action="companies/new"  method="post" onSubmit={handleSubmit(createCompany)}>
            <div className="form-group">
                <label htmlFor="full_name" className="sr-only">Полное наименование</label>
                <input 
                    type="text"  
                    name="full_name"  
                    className="form-control" 
                    id="full_name" 
                    placeholder="Полное наименование"
                    {...register("full_name", {required: "Full_name is required!"})}

                    // onChange={e => setFullName(e.target.value)} value={full_name}
                />
                {errors?.full_name?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
          
            <div className="form-group">
                <label htmlFor="short_name" className="sr-only">Сокращенное наименование</label>
                <input 
                    type="text" 
                    name="short_name" 
                    className="form-control" 
                    id="short_name" 
                    placeholder="Сокращенное наименование" 
                    {...register("short_name", { required: "Short_name is required" })}
                    // onChange={e => setShortName(e.target.value)} value={short_name}
                />
                {errors?.short_name?.message && <p style={{color: "red"}}>Поле должно быть заполнено!</p>}
            </div>

            <div className="form-group">
                <input 
                    type="submit" 
                    id="btn-submit" 
                    className="btn btn-primary btn-send-message btn-md" 
                    value="Зарегистрировать" 
                    // disabled={submitting}
                    // onClick={e => createCompany(e)}
                />
            </div>
        </form>               
        
    )
}

```

```jsx
// CreateCompanyForm.jsx

import { useState, useEffect } from "react";
import styles from "./CreateCompanyForm.module.css"
import { CompanyService } from "../company.service";
import { useForm } from "react-hook-form"
import { QueryClient, useMutation, useQueryClient } from "react-query";

export default function CreateCompanyForm() {
   

    const { register, reset, handleSubmit, formState: {errors} } = useForm({
        mode: "onChange",
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation(["create company"], (data) => CompanyService.createCompany(data.full_name, data.short_name), {
        onSuccess: () => {
            queryClient.invalidateQueries(["companies"])
        }
    })

    const createCompany = data => {
    
        mutate(data)

    }   

     

    return (

        <form action="companies/new"  method="post" onSubmit={handleSubmit(createCompany)}>
            <div className="form-group">
                <label htmlFor="full_name" className="sr-only">Полное наименование</label>
                <input 
                    type="text"  
                    name="full_name"  
                    className="form-control" 
                    id="full_name" 
                    placeholder="Полное наименование"
                    {...register("full_name", {required: "Full_name is required!"})}

                />
                {errors?.full_name?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
          
            <div className="form-group">
                <label htmlFor="short_name" className="sr-only">Сокращенное наименование</label>
                <input 
                    type="text" 
                    name="short_name" 
                    className="form-control" 
                    id="short_name" 
                    placeholder="Сокращенное наименование" 
                    {...register("short_name", { required: "Short_name is required" })}
                />
                {errors?.short_name?.message && <p style={{color: "red"}}>Поле должно быть заполнено!</p>}
            </div>

            <div className="form-group">
                <input 
                    type="submit" 
                    id="btn-submit" 
                    className="btn btn-primary btn-send-message btn-md" 
                    value="Зарегистрировать" 
                    
                />
            </div>
        </form>               
        
    )
}

```

# React Select https://react-select.com/home

```
yarn add react-select
```

```
yarn add @hookform/error-message
```

```
yarn add react-icons
```


# SASS установка: 
```
npm install -g sass
```
## файл .vscode/settings.json
```
{
    ...

    "tasks": [
        {
            "label": "Compile SCCS to CSS",
            "type": "shell",
            "command": "sass styles.scss styles.css ",
            "group": "build",
        }
    ]
}
```

## Установим плагин на VS Code
    Live Sass Compiler


# React bootstrap https://react-bootstrap.github.io/docs/getting-started/introduction

```
yarn add react-bootstrap bootstrap
```

``` tsx

//файл main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom';

// подключаем bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from './App';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render( 
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
        
    </React.StrictMode>
       
)

```


# 3.9 Блочная модель и псевдоклассы
О чём вы узнаете
В прошлом видео вы узнали, что такое блочная модель. В её основе правила, по которым браузер определяет ширину и высоту элемента. Браузер следует определённым алгоритмам, которые можно менять, чтобы настраивать параметры размеров.

В этом материале вы разберёте темы, позволяющие больше погрузиться в работу с блочной моделью. Вы узнаете о свойстве display, позволяющем выбрать способ отображения элемента, научитесь настраивать расчёт ширины и высоты блока с помощью свойства box-sizing. Также узнаете, что такое псевдоклассы и для чего они нужны. На основе полученных знаний сможете создать простую сетку.

## Свойство display
display — CSS-свойство, позволяющее настраивать способ отображения и поведения элемента относительно других элементов.

Рассмотрим четыре разных значения для свойства display, с помощью которых можно менять расположение элементов. 


## display: block;
Значение block для свойства display задаст элементу следующие настройки:

элемент будет видимым на странице;
границы элемента описывает прямоугольник;
элемент займёт всю ширину своего родительского блока (это можно изменить с помощью свойства width); 
следующий соседний элемент будет расположен под текущим.

Здесь и далее — изображения Skillbox

Посмотрите пример использования значения block по ссылке.

Многим элементам браузер по умолчанию назначает блочное поведение (display: block;) для свойства display по умолчанию. Например, для 
```html
<div>, <p>, <ul>, <h1>, <h2>, <h3>, <h4>
```
 и других.


## display: inline;
Значение inline для свойства display задаст элементу следующие настройки:

элемент будет видимым на странице;
границы элемента будут определяться его содержимым с учётом переносов на новую строку, width и height не работают;
элементы с display: inline; будут расположены последовательно друг за другом; их поведение похоже на слово в тексте, которое переносится на новую строку, если не умещается в своём блоке.

Посмотрите пример использования значения inline по ссылке.

Элементы, которым браузер назначает инлайновое (display: inline;) поведение по умолчанию: 
```html
<a>, <strong>, <b>, <i>
```
 и другие.



## display: inline-block;
Значение inline-block сочетает инлайновое и блочное поведение элемента, а именно:

элемент будет видимым на странице;
ширина и высота будут определяться содержимым этого элемента, width и height работают; 
элементы с display: inline-block; будут расположены последовательно друг за другом; их поведение похоже на слово в тексте, которое переносится на новую строку, если не умещается в своём блоке.

Посмотрите пример использования значения inline-block по ссылке.


## display: none;
Значение none для свойства display задаст элементу следующие настройки:

элемент будет невидимым на странице;
элемент не будет влиять на расположение других элементов.
Посмотрите пример использования значения none по ссылке.

Свойству display можно задавать и другие значения, которые настроят способ отображения вложенных элементов и его самого. В следующих модулях вы узнаете об этом больше.

Пример создания сетки
На текущем этапе вы знакомы лишь с некоторыми свойствами display, но уже на их основе вы можете создать что-либо интересное. Например, сетку. 

Сетка — это каркас веб-страницы, который нужен для расположения блоков внутри её элементов.

Создадим четыре элемента  ``` <div> ``` с классами col — это будут колонки сетки. Укажем настройки ширины, высоты и фона. Свойство display со значением inline-block поможет расположить элементы последовательно слева направо:

```html
<body>
  <div class="col">Колонка 1</div>
  <div class="col">Колонка 2</div>
  <div class="col">Колонка 3</div>
  <div class="col">Колонка 4</div>
</body>
```
```css
.col {
  display: inline-block;
  width: 25%;
  height: 300px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

Уберём лишние отступы у body, чтобы создаваемая стека занимала всю ширину экрана:

```css
body {
  margin: 0;
}

.col {
  display: inline-block;
  width: 25%;
  height: 300px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

Ширина каждой из четырёх колонок составляет 25%, в сумме они дадут 100% от размера экрана, но одна из колонок по-прежнему смещена и расположена внизу. Обратите внимание: между колонками есть небольшие пробелы.  Это связано с тем, что элементы с display: inline-block ведут себя почти так же, как символы в тексте. Между символами есть отступы, чтобы они не склеивались. Создадим ещё один div с классом row. Зададим ему свойство размера шрифта font-size со значением 0, а сами колонки вложим внутрь этого блока. Не забудьте вернуть колонкам размер шрифта font-size: 16px; в настройках класса col, иначе текст в колонке отображаться не будет. 
``` html  
<div class="row">
    <div class="col">Колонка 1</div>
    <div class="col">Колонка 2</div>
    <div class="col">Колонка 3</div>
    <div class="col">Колонка 4</div>
  </div>
```
```css
body {
  margin: 0;
}
.row {
  font-size: 0;
}
.col {
  display: inline-block;
  width: 25%;
  height: 300px;
  font-size: 16px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

Всё готово. Такие сетки в будущем помогут вам размещать элементы внутри её колонок в нужном месте и порядке.

## Свойство box-sizing
Не секрет, что элементам на странице можно указать внутренние отступы с помощью padding. Также рамка, которая задаётся свойством border, может повлиять на размер самого блока, что создаст путаницу, ведь за размеры блока отвечают свойства width и height. Давайте разбираться.

По умолчанию все элементы с display: block; или display: inline-block; не включают в свои размеры width и height внутренние отступы, padding и инструмент border. Это означает, фактический размер блока будет больше, чем установленный в свойствах width и height. За такое поведение расчёта размеров отвечает свойство box-sizing. 

### box-sizing — свойство, определяющее, как именно будет рассчитана общая ширина блока: с включением padding и border или без них.

Рассмотрим два значения для свойства box-sizing, с помощью которых можно менять расположение элементов. 



## box-sizing: content-box;
Значение content-box установлено для элементов по умолчанию. Это означает, что внутренние отступы и рамка будут снаружи указанной ширины и высоты блока.

Значение content-box для свойства box-sizing неудобно в работе, так как становится сложнее определить фактический размер блока, и это мешает. Поэтому его обычно отключают и переводят box-sizing в режим border-box.



## box-sizing: border-box;
Значение border-box поможет включить внутренние отступы padding и рамку в указанные размеры width и height. 

Рекомендуем устанавливать это значение для всех элементов на странице. Бывают исключения, но они встречаются очень редко.


Давайте применим знания о свойстве box-sizing для доработки сетки.

## Доработка сетки
Доработаем ранее созданную сетку и добавим колонкам внутренние отступы:

Добавим колонкам CSS-стиль, а именно внутренний отступ padding: 30px;
```css
.col {
  display: inline-block;
  padding: 30px;
  width: 25%;
  height: 300px;
  font-size: 16px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

После добавления внутренних отступов четвёртая колонка сместилась вниз. Это происходит из-за того, что к ширине колонки 25% были добавлены отступы и блок увеличился в размере, так как по умолчанию значение box-sizing: content-box и отступы не включены в ширину колонки. Исправим это, установив значение border-box для box-sizing:
```css
.col {
  display: inline-block;
  padding: 30px;
  width: 25%;
  height: 300px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: darkseagreen;
}
```

Пример кода можно посмотреть по ссылке.

# Псевдоклассы
Классы удобны для стилизации набора однотипных элементов, которыми и являются колонки сетки. Но что, если для определённых колонок необходимо задать уникальные параметры, с помощью которых нужно, например, изменить цвет фона?

Псевдокласс в CSS — это специальное ключевое слово, добавленное к селектору.

Рассмотрим четыре основных псевдокласса, которые помогут вам стилизовать блоки. 


## :first-child
:first-child — псевдокласс, который поможет стилизовать первый элемент родительского блока. В нашем примере сетки родителем является блок с классом row, и с помощью :first-child, применённого к col, можно изменить цвет фона первой колонки. 

Для этого в селекторе указывается .название-класса:first-child. Обратите внимание, при создании псевдокласса пробелы не пишутся.


Посмотрите пример использования значения :first-child по ссылке.



## :last-child
:last-child работает так же, как и :first-child, только стилизация будет применена к последнему элементу родителя.

Для этого в селекторе указывается .название-класса:last-child. Обратите внимание, при создании псевдокласса пробелы не пишутся.


Посмотрите пример использования значения :last-child по ссылке.



## :nth-child()
:nth-child устанавливает стилизацию для элементов с порядковым номером:

.название-класса:nth-child(3) — будет стилизован только третий элемент;
.название-класса:nth-child(2n) — будет стилизован каждый второй элемент. Обратите внимание, при создании псевдокласса пробелы не пишутся.

Посмотрите пример использования значения :nth-child() по ссылке.


## :not()
:not() используется с другими псевдоселекторами и помогает стилизовать все элементы, кроме тех, которые указаны внутри скобок:

.название-класса:not(:first-child) — будут стилизованы все элементы, кроме первого;
.название-класса:not(:last-child) — будут стилизованы все элементы, кроме последнего;
.название-класса:not(:nth-child(2)) — будут стилизованы все элементы, кроме второго. Обратите внимание, при создании псевдокласса пробелы не пишутся.

Посмотрите пример использования значения :not() по ссылке.


# FLEXBOX

Справочная информация
Модуль Flexbox Layout (Flexible Box) (рекомендация для кандидатов в W3C по состоянию на октябрь 2017 года) направлен на предоставление более эффективного способа размещения, выравнивания и распределения пространства между элементами в контейнере, даже если их размер неизвестен и / или динамичен (отсюда и слово “гибкий”).

Основная идея гибкого макета заключается в том, чтобы предоставить контейнеру возможность изменять ширину / высоту (и порядок) своих элементов, чтобы наилучшим образом заполнить доступное пространство (в основном для размещения на всех типах устройств отображения и размерах экрана). Гибкий контейнер расширяет элементы, чтобы заполнить доступное свободное пространство, или сжимает их, чтобы предотвратить переполнение.

Самое главное, что макет flexbox не зависит от направления, в отличие от обычных макетов (блочный, который основан по вертикали, и встроенный, который основан по горизонтали). Хотя они хорошо работают для страниц, им не хватает гибкости (не хочу каламбурить) для поддержки больших или сложных приложений (особенно когда дело доходит до изменения ориентации, размера, растяжения, сжатия и т.д.).

Примечание: Макет Flexbox наиболее подходит для компонентов приложения и макетов небольшого масштаба, в то время как макет Grid предназначен для макетов большего масштаба.

## Основы и терминология
Поскольку flexbox - это целый модуль, а не отдельное свойство, он включает в себя множество вещей, включая весь его набор свойств. Некоторые из них предназначены для установки в контейнере (родительский элемент, известный как “гибкий контейнер”), тогда как другие предназначены для установки в дочерних элементах (так называемые “гибкие элементы”).

Если ”обычная" верстка основана как на блочных, так и на встроенных направлениях потока, то гибкая верстка основана на "направлениях гибкого потока”. Пожалуйста, взгляните на этот рисунок из спецификации, объясняющий основную идею, лежащую в основе гибкого макета.

Диаграмма, объясняющая терминологию flexbox. Размер по главной оси flexbox называется основным размером, в другом направлении - поперечным размером. Эти размеры имеют главное начало, главный конец, перекрестное начало и перекрестный конец.
Элементы будут располагаться либо по main axis (от main-start до main-end), либо по поперечной оси (от cross-start до cross-end).

главная ось – Главная ось контейнера flex - это основная ось, вдоль которой располагаются элементы flex. Будьте осторожны, он не обязательно горизонтальный; это зависит от flex-direction свойства (см. Ниже).
main-start | main-end – Элементы flex размещаются внутри контейнера, начиная с main-start и заканчивая main-end.
Основной размер – Ширина или высота элемента flex, в зависимости от того, что находится в основном измерении, является основным размером элемента. Основным свойством размера элемента flex является свойство ‘width’ или ‘height’, в зависимости от того, что находится в основном размере.
поперечная ось – ось, перпендикулярная главной оси, называется поперечной осью. Ее направление зависит от направления главной оси.
перекрестные | сквозные линии Flex заполняются элементами и помещаются в контейнер, начиная со стороны перекрестного начала контейнера flex и направляясь к стороне перекрестного конца.
поперечный размер – ширина или высота элемента flex, в зависимости от того, что находится в поперечном измерении, является поперечным размером элемента. Свойство cross size зависит от того, какое из значений ‘width’ или ‘height’ находится в поперечном измерении.

## отобразить
Это определяет контейнер flex; встроенный или блочный в зависимости от заданного значения. Это позволяет использовать контекст flex для всех его прямых дочерних элементов.

```css
.container {
  display: flex; /* or inline-flex */
}

```

Обратите внимание, что столбцы CSS никак не влияют на контейнер flex.

## flex-direction
показаны четыре возможных значения flex-direction: сверху вниз, снизу вверх, справа налево и слева направо

Это устанавливает главную ось, таким образом определяя направление, в котором элементы flex размещаются в контейнере flex. Flexbox (помимо необязательной упаковки) представляет собой концепцию однонаправленного макета. Представьте, что элементы flex в основном располагаются либо горизонтальными рядами, либо вертикальными столбцами.

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

row (по умолчанию): слева направо в ltr; справа налево в rtl

row-reverse: справа налево в ltr; слева направо в rtl

column: то же, что и row, но сверху вниз

column-reverse: то же, что и row-reverse, но снизу вверх

## flex-wrap
два ряда коробок, первый переходящий во второй
По умолчанию все элементы flex будут пытаться поместиться в одну строку. Вы можете изменить это и разрешить перенос элементов по мере необходимости с помощью этого свойства.

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```


nowrap (по умолчанию): все элементы flex будут располагаться в одной строке

wrap: элементы flex будут переноситься в несколько строк сверху вниз.

wrap-reverse: элементы flex будут переноситься в несколько строк снизу вверх.

## flex-flow
Это сокращение для свойств flex-direction и flex-wrap, которые вместе определяют главную и поперечную оси контейнера flex. Значение по умолчанию - row nowrap.
```css
.container {
  flex-flow: column wrap;
}
```

## justify-content

Это определяет выравнивание по главной оси. Это помогает распределить дополнительное свободное пространство, оставшееся, когда либо все элементы flex в строке негибкие, либо они гибкие, но достигли своего максимального размера. Он также предоставляет некоторый контроль над выравниванием элементов, когда они выходят за пределы строки.

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
}
```
flex-start (по умолчанию): элементы упаковываются в начале гибкого направления.

flex-end: элементы упаковываются ближе к концу гибкого направления.

start: элементы упаковываются в начале writing-mode направления.

end: элементы упаковываются ближе к концу writing-mode направления.

left: элементы упаковываются к левому краю контейнера, если это не имеет 
смысла для flex-direction, тогда он ведет себя следующим образом start.

right: элементы упаковываются к правому краю контейнера, если это не имеет смысла для flex-direction, тогда он ведет себя следующим образом end.

center: элементы располагаются по центру вдоль линии

space-between: элементы равномерно распределены в строке; первый элемент находится в начальной строке, последний элемент - в конечной строке

space-around: элементы равномерно распределены по линии с равным пространством вокруг них. Обратите внимание, что визуально пробелы неравны, поскольку у всех элементов одинаковое пространство с обеих сторон. У первого элемента будет одна единица пространства у края контейнера, но две единицы пространства между следующим элементом, потому что у следующего элемента есть свой интервал, который применяется.

space-evenly: элементы распределяются таким образом, чтобы расстояние между любыми двумя элементами (и расстояние до краев) было одинаковым.
Обратите внимание, что поддержка браузером этих значений имеет свои нюансы. Например, space-between никогда не получал поддержки от некоторых версий Edge, а start / end / left / right еще нет в Chrome. В MDN есть подробные диаграммы. Самые безопасные значения - это flex-start, flex-end и center.

Есть также два дополнительных ключевых слова, которые вы можете связать с этими значениями: safe и unsafe. Использование safe гарантирует, что, как бы вы ни позиционировали этот тип, вы не сможете переместить элемент так, чтобы он отображался за пределами экрана (например, сверху), таким образом, содержимое также не может прокручиваться (это называется “потерей данных”).

## align-items
Это определяет поведение по умолчанию для размещения элементов flex вдоль поперечной оси на текущей линии. Думайте об этом как о justify-content версии для поперечной оси (перпендикулярной главной оси).

```css
.container {
  align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
}
```
stretch (по умолчанию): растягивать, чтобы заполнить контейнер (по-прежнему соблюдая минимальную ширину / максимальную ширину)

flex-start / start / self-start: элементы размещаются в начале поперечной оси. Разница между ними неуловима и заключается в соблюдении 

flex-direction правил или в writing-mode предписаниях.

flex-end / end / self-end: элементы размещаются в конце поперечной оси. Разница, опять же, неуловима и заключается в соблюдении flex-direction правил по сравнению с writing-mode rules.

center: элементы центрируются по поперечной оси

baseline: элементы выравниваются так, как выравниваются их базовые линии

Ключевые слова-модификаторы safe и unsafe могут использоваться в сочетании со всеми остальными ключевыми словами (хотя обратите внимание на поддержку браузера) и помогают предотвратить выравнивание элементов таким образом, чтобы содержимое становилось недоступным.

## align-content

Это позволяет выравнивать линии контейнера flex внутри, когда на поперечной оси остается лишнее пространство, аналогично тому, как justify-content выравнивает отдельные элементы внутри главной оси.

Примечание: Это свойство вступает в силу только для многострочных гибких контейнеров, где flex-wrap установлено значение или wrap или wrap-reverse). Однострочный гибкий контейнер (т. Е. Где flex-wrap установлено значение по умолчанию, no-wrap) не будет отражать align-content.

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
}
```
normal (по умолчанию): элементы упаковываются в положение по умолчанию, как если бы значение не было задано.

flex-start / start: элементы, упакованные в начале контейнера. (Более поддерживается) flex-start соблюдаетflex-direction, в то время как start соблюдает writing-mode направление.

flex-end / end: элементы упаковываются до конца контейнера. (Дополнительная поддержка) flex-end соблюдаетflex-direction, а end соблюдает writing-mode направление.

center: элементы, размещенные по центру контейнера

space-between: элементы распределены равномерно; первая строка находится в начале контейнера, а последняя - в конце

space-around: элементы равномерно распределены с равным пространством вокруг каждой строки

space-evenly: элементы равномерно распределены с равным пространством вокруг них

stretch: линии растягиваются, занимая оставшееся пространство

Ключевые слова-модификаторы safe и unsafe могут использоваться в сочетании со всеми остальными ключевыми словами (хотя обратите внимание на поддержку браузера) и помогают предотвратить выравнивание элементов таким образом, чтобы содержимое становилось недоступным.

## gapСвойство 
явно управляет расстоянием между элементами flex. Это расстояние применяется только между элементами, а не по внешним краям.

```css
.container {
  display: flex;
  ...
  gap: 10px;
  gap: 10px 20px; /* row-gap column gap */
  row-gap: 10px;
  column-gap: 20px;
}
```
Поведение можно рассматривать как минимальный желоб, как будто желоб каким-то образом больше (из-за чего-то вроде justify-content: space-between;), тогда разрыв вступит в силу только в том случае, если это пространство в конечном итоге станет меньше.

Оно предназначено не только для flexbox, gap также работает в сетке и с многостолбцовым макетом.


## Примеры
Давайте начнем с очень-очень простого примера решения почти повседневной проблемы: идеального центрирования. Ничего не может быть проще, если вы используете flexbox.

```css
.parent {
  display: flex;
  height: 300px; /* Or whatever */
}

.child {
  width: 100px;  /* Or whatever */
  height: 100px; /* Or whatever */
  margin: auto;  /* Magic! */
}
```
Это основано на том факте, что поле, установленное на auto в контейнере flex, занимает дополнительное пространство. Таким образом, установка поля на auto сделает элемент идеально центрированным по обеим осям.

Теперь давайте воспользуемся еще некоторыми свойствами. Рассмотрим список из 6 элементов, все с фиксированными размерами, но могут иметь автоматический размер. Мы хотим, чтобы они были равномерно распределены по горизонтальной оси, чтобы при изменении размера браузера все масштабировалось красиво и без медиазапросов.

```css
.flex-container {
  /* We first create a flex layout context */
  display: flex;

  /* Then we define the flow direction 
     and if we allow the items to wrap 
   * Remember this is the same as:
   * flex-direction: row;
   * flex-wrap: wrap;
   */
  flex-flow: row wrap;

  /* Then we define how is distributed the remaining space */
  justify-content: space-around;
}
```
Выполнено. Все остальное зависит от стиля. Ниже приведена ручка с этим примером. Обязательно зайдите в CodePen и попробуйте изменить размер windows, чтобы посмотреть, что получится.

Давайте попробуем что-нибудь еще. Представьте, что у нас есть элемент навигации, выровненный по правому краю, в самом верху нашего веб-сайта, но мы хотим, чтобы он располагался по центру на экранах среднего размера и состоял из одной колонки на небольших устройствах. Достаточно просто.
```css
/* Large */
.navigation {
  display: flex;
  flex-flow: row wrap;
  /* This aligns items to the end line on main-axis */
  justify-content: flex-end;
}

/* Medium screens */
@media all and (max-width: 800px) {
  .navigation {
    /* When on medium sized screens, we center it by evenly distributing empty space around items */
    justify-content: space-around;
  }
}

/* Small screens */
@media all and (max-width: 500px) {
  .navigation {
    /* On small screens, we are no longer using row direction but column */
    flex-direction: column;
  }
}
```
Давайте попробуем кое-что еще лучше, поиграв с гибкостью элементов flex! Как насчет макета из 3 столбцов для мобильных устройств с верхним и нижним колонтитулами во всю ширину. И независимым от исходного кода порядком.

```css
.wrapper {
  display: flex;
  flex-flow: row wrap;
}

/* We tell all items to be 100% width, via flex-basis */
.wrapper > * {
  flex: 1 100%;
}

/* We rely on source order for mobile-first approach
 * in this case:
 * 1. header
 * 2. article
 * 3. aside 1
 * 4. aside 2
 * 5. footer
 */

/* Medium screens */
@media all and (min-width: 600px) {
  /* We tell both sidebars to share a row */
  .aside { flex: 1 auto; }
}

/* Large screens */
@media all and (min-width: 800px) {
  /* We invert order of first sidebar and main
   * And tell the main element to take twice as much width as the other two sidebars 
   */
  .main { flex: 3 0px; }
  .aside-1 { order: 1; }
  .main    { order: 2; }
  .aside-2 { order: 3; }
  .footer  { order: 4; }
}
```