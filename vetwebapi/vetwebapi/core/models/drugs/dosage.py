from typing import TYPE_CHECKING

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .drug import Drug


class Dosage(Base):
    """Модель Дозировка препарата"""

    __tablename__ = "dosages"

    name: Mapped[str] = mapped_column(Text)

    drugs: Mapped[list["Drug"]] = relationship(back_populates="dosage")

    def __repr__(self) -> str:
        return self.name
