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
