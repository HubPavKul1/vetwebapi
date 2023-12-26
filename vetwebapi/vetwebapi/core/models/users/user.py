from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .role import Role

class User(Base):
    role: int = mapped_column(ForeignKey("Role", ondelete="CASCADE"))
    username: str = mapped_column(String(10))
    password: str