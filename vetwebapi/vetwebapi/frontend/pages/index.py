from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from vetwebapi.core.settings import settings


router = APIRouter()


@router.get("/home", response_class=HTMLResponse)
async def home(request: Request):
    return settings.templates.TemplateResponse("index.html", {"request": request})
