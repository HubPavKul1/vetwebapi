from fastapi import Form
from typing import Annotated
from httpx import AsyncClient
from loguru import logger
from core.settings import settings
import pytest


async def test_start(ac: AsyncClient, prepare_db):
    response = await ac.get("/")
    assert response.status_code == 200
    assert response.json().get("message") == "All data have been added!"


async def test_login(ac: AsyncClient):
    user_data = {"username": settings.su_email, "password": settings.su_pass}
    response = await ac.post("/api/auth/jwt/login", data=user_data)
    assert response.status_code == 204


# test CREATE routes
# async def test_create_company_route(ac: AsyncClient):
#     company_data = {"full_name": "Company1", "short_name": "Comp1"}
#     response = await ac.post("/api/companies/", json=company_data)
#     assert response.status_code == 401
#     # assert response.json().get("company_id") == 1


# async def test_create_clinic_route(ac: AsyncClient):
#     company_data = {"full_name": "VetClinic1", "short_name": "Vet1"}
#     response = await ac.post("/api/companies/vets", json=company_data)
#     assert response.status_code == 401
#     # assert response.json().get("company_id") == 2


# async def test_create_lab_route(ac: AsyncClient):
#     company_data = {"full_name": "VetLab1", "short_name": "Lab1"}
#     response = await ac.post("/api/companies/labs", json=company_data)
#     assert response.status_code == 401
# assert response.json().get("company_id") == 3


# async def test_add_address_route(ac: AsyncClient):
#     address_data_valid = {"street_id": 1, "house_number": "2А", "phone_number1": "8(888)888-88-88"}
#     address_data_no_phone = {"street_id": 1, "house_number": "2А"}
#     address_data_no_house_number = {"street_id": 1, "phone_number1": "8(888)888-88-88"}
#     response1 = await ac.post("/api/companies/1/address/", json=address_data_valid)
#     assert response1.status_code == 201
#     response2 = await ac.post("/api/companies/1/address/", json=address_data_no_phone)
#     assert response2.status_code == 422
#     response3 = await ac.post("/api/companies/1/address/", json=address_data_no_house_number)
#     assert response3.status_code == 422


# Test GET routes
async def test_get_companies(ac: AsyncClient):
    response = await ac.get("/api/companies/")
    assert response.status_code == 200


# async def test_get_company_detail(ac: AsyncClient):
#     response = await ac.get("/api/companies/1/")
#     logger.info(response.json())
#     assert response.status_code == 200
#     assert response.json().get("full_name") == "Company1"
#     assert response.json().get("address").get("street") == "улица Ивановская"


# async def test_get_clinics(ac: AsyncClient):
#     response = await ac.get("/api/companies/vets")
#     assert response.status_code == 200


# async def test_get_labs(ac: AsyncClient):
#     response = await ac.get("/api/companies/labs")
#     assert response.status_code == 200


# Test DELETE Routes
# async def test_delete_address(ac: AsyncClient):
#     response = await ac.delete("/api/companies/1/address/1")
#     assert response.status_code == 202


# async def test_delete_company(ac: AsyncClient):
#     response = await ac.delete("/api/companies/1/")
#     assert response.status_code == 202
