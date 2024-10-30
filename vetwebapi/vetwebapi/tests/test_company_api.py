from httpx import AsyncClient
from .conftest import test_db_manager


async def test_get_companies(ac: AsyncClient):
    response = await ac.get("/api/companies/")
    print("Response>>>>>>>", response.json())
    assert response.status_code == 200


async def test_create_company_route(ac: AsyncClient):
    company_data = {"full_name": "Company1", "short_name": "Comp1"}
    response = await ac.post("/api/companies/", json=company_data)
    assert response.status_code == 201
