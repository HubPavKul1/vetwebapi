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
