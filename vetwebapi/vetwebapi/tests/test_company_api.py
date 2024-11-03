from httpx import AsyncClient
from .conftest import test_db_manager
from core.database import db_url



async def test_create_company_route(ac: AsyncClient):
    company_data = {"full_name": "Company1", "short_name": "Comp1"}
    response = await ac.post("/api/companies/", json=company_data)
    assert response.status_code == 201


async def test_create_test_companies_route(ac: AsyncClient):
    response = await ac.post("/api/companies/test")
    assert response.status_code == 201


async def test_get_companies(ac: AsyncClient):
    response = await ac.get("/api/companies/")
    print("Response>>>>>>>", response.json())
    print("DB_URL+++++", db_url)
    assert response.status_code == 200
