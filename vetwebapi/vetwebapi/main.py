from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1 import router as router_v1
from api_v1.auth import crud
from core.database import db_manager
from core.models.users.create_superuser import create_superuser
from core.settings import settings
from utils import utils

app = FastAPI()


logger.add("logs/log_{time:YYYY-MM-DD}.log")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://192.168.99.101:3000",
        "http://192.168.99.101:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router_v1, prefix=settings.api_v1_prefix)


@app.get("/")
async def start(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    if not await crud.read_roles(session=session):
        await utils.prepare_db(session=session)
        logger.debug("All data have been added!")
        await create_superuser(session=session)
        logger.debug("The superuser created!")
        return {"message": "All data have been added!"}

    logger.debug("Database already prepared!")
    return {"message": "Hello, Dude!!!"}
