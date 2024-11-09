from fastapi import APIRouter
from fastapi_users import FastAPIUsers


from core.models import User, auth_backend, get_user_manager

from .schemas import UserCreate, UserRead

fastapi_users = FastAPIUsers[User, int](get_user_manager, [auth_backend])

router = APIRouter(tags=["Auth"])

router.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt")

router.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth")
