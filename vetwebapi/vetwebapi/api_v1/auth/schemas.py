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
