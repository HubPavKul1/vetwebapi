from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .drug import Drug


class Budget(Base):
    """Модель Бюджет"""

    __tablename__ = "budgets"

    name: Mapped[str] = mapped_column(String(100))

    drugs: Mapped[list["Drug"]] = relationship(back_populates="budget")

    def __repr__(self) -> str:
        return self.name
