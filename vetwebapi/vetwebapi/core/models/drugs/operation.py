from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .drug_movement import DrugMovement


class Operation(Base):
    """Класс Операция перемещения препарата"""

    __tablename__ = "operations"

    name: Mapped[str] = mapped_column(String(100))

    drug_movement: Mapped[list["DrugMovement"]] = relationship(back_populates="operation")

    def __repr__(self) -> str:
        return self.name
