from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .animal import Animal, Gender
    from .animal_group import AnimalGroup


class Species(Base):
    """Класс Вид животных"""

    __tablename__ = "species"

    animal_group_id: Mapped[int] = mapped_column(
        ForeignKey("animal_groups.id", ondelete="CASCADE")
    )
    name: Mapped[str] = mapped_column(String(100))

    animals: Mapped[list["Animal"]] = relationship(back_populates="species")
    animal_group: Mapped["AnimalGroup"] = relationship(
        back_populates="species", lazy="joined"
    )
    genders: Mapped[list["Gender"]] = relationship(back_populates="species")

    def __repr__(self) -> str:
        return self.name
