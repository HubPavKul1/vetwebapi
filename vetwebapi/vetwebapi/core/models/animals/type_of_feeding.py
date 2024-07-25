from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .animal_group import AnimalGroup


class TypeOfFeeding(Base):
    """Класс Тип кормления"""

    __tablename__ = "types_of_feeding"

    name: Mapped[str] = mapped_column(String(100))

    animal_groups: Mapped[list["AnimalGroup"]] = relationship(back_populates="type_of_feeding")

    def __repr__(self) -> str:
        return self.name
