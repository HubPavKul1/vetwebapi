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





