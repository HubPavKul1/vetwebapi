from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .user import User


class Role(Base):
    __tablename__ = "roles"

    name: Mapped[str]

    users: Mapped[list["User"]] = relationship(back_populates="role")

    def __repr__(self) -> str:
        return self.name
