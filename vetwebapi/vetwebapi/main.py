from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_users import FastAPIUsers

from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.models import User
from vetwebapi.core.models.users.manager import get_user_manager
from vetwebapi.core.models.users.auth import auth_backend

from vetwebapi.core.settings import settings
from vetwebapi.core.database import db_manager
from vetwebapi.utils import utils
from vetwebapi.api_v1 import router as router_v1
from vetwebapi.api_v1.auth.schemas import UserCreate, UserRead

app = FastAPI()

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router_v1, prefix=settings.api_v1_prefix)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)



@app.get("/")
async def start(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    await utils.fill_street_table(session=session)
    await utils.add_start_roles(session=session)
    return {"message": "Аll streets have been added!"}
