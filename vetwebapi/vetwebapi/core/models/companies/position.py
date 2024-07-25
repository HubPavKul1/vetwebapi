from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .employee import Employee


class Position(Base):
    """Класс Должность"""

    __tablename__ = "positions"

    name: Mapped[str] = mapped_column(String(100))

    employees: Mapped[list["Employee"]] = relationship(back_populates="position")

    def __repr__(self) -> str:
        return self.name
