from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from vetwebapi.core.settings import settings
from vetwebapi.core.database import db_manager

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app.include_router(router_v1, prefix=settings.api_v1_prefix)


@app.get("/")
async def start(session: AsyncSession = Depends(db_manager.scope_session_dependency)):
    return {"message": "Hello Dude!"}
