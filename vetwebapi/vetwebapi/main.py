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
