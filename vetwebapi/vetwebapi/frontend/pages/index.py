from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from vetwebapi.core.settings import settings


router = APIRouter()


@router.get("/", response_class=HTMLResponse, name="home")
async def get_index_page(request: Request):
    return settings.templates.TemplateResponse("index.html", {"request": request})
