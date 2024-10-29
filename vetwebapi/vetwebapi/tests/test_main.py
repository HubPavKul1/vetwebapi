from httpx import AsyncClient

from .conftest import test_db_manager, ac, url


async def test_start(ac: AsyncClient, prepare_db):
    async with test_db_manager.async_session_factory() as session:
        # users_before = await crud.read_users(session=session)
        # assert len(users_before) == 0
        response = await ac.get("/")
        print(response.status_code)
        assert response.status_code == 200


# users_after = await crud.read_users(session=session)
# assert len(users_after) == 5
