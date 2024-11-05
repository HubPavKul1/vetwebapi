from httpx import AsyncClient
from .conftest import test_db_manager


async def test_create_company_route(ac: AsyncClient):
    company_data = {"full_name": "Company1", "short_name": "Comp1"}
    response = await ac.post("/api/companies/", json=company_data)
    assert response.status_code == 201


async def test_create_clinic_route(ac: AsyncClient):
    company_data = {"full_name": "VetClinic1", "short_name": "Vet1"}
    response = await ac.post("/api/companies/vets", json=company_data)
    assert response.status_code == 201


async def test_create_lab_route(ac: AsyncClient):
    company_data = {"full_name": "VetLab1", "short_name": "Lab1"}
    response = await ac.post("/api/companies/labs", json=company_data)
    assert response.status_code == 201


# async def test_create_test_companies_route(ac: AsyncClient):
#     response = await ac.post("/api/companies/test")
#     assert response.status_code == 201


async def test_get_companies(ac: AsyncClient):
    response = await ac.get("/api/companies/")
    print("Response>>>>>>>", response.json())
    assert response.status_code == 200


async def test_get_clinics(ac: AsyncClient):
    response = await ac.get("/api/companies/vets")
    print("Response>>>>>>>", response.json())
    assert response.status_code == 200


async def test_get_labs(ac: AsyncClient):
    response = await ac.get("/api/companies/labs")
    print("Response>>>>>>>", response.json())
    assert response.status_code == 200


# async def test_delete_company(ac: AsyncClient):
#     response = await ac.delete("/api/companies/1/")
#     assert response.status_code == 202
