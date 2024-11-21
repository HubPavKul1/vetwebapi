import os
from pathlib import Path

from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    api_v1_prefix: str = "/api"
    files_dir: str = os.path.join(BASE_DIR, "files")

    media_dir: str = os.path.join(BASE_DIR, "media")

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

    su_name: str
    su_email: str
    su_pass: str

    db_echo: bool = False

    @property
    def db_url(self):
        return f"postgresql+asyncpg://{self.db_user}:{self.db_pass}@{self.db_host}:{self.db_port}/{self.db_name}"

    class Config:
        env_file = ".env"
        # env_file = ".dev.env"
        env_file_encoding = "utf-8"


settings = Settings(
    _env_file=os.path.join(BASE_DIR, ".env"), _env_file_encoding="utf-8"
)
