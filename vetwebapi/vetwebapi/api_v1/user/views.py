from fastapi import APIRouter

from api_v1.schemas import SuccessMessage

router = APIRouter(tags=["Users"])


@router.get("/users", response_model=SuccessMessage)
async def get_user():
    return SuccessMessage()
