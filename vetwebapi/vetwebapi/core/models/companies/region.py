from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .district import District


class Region(Base):
    """Класс Область"""

    __tablename__ = "regions"

    name: Mapped[str] = mapped_column(String(100))

    districts: Mapped[list["District"]] = relationship(
        back_populates="region", cascade="all, delete"
    )

    def __repr__(self) -> str:
        return self.name
