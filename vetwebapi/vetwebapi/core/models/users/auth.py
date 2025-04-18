from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
    JWTStrategy,
)

from core.settings import settings

cookie_transport = CookieTransport(
    cookie_name="vetwebapi", cookie_max_age=3600, cookie_secure=False
)

SECRET = settings.secret_jwt


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt", transport=cookie_transport, get_strategy=get_jwt_strategy
)
