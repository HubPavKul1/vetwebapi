from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .species import Species
    from .type_of_feeding import TypeOfFeeding


class AnimalGroup(Base):
    """Класс Группа животных"""

    __tablename__ = "animal_groups"

    type_of_feeding_id: Mapped[int] = mapped_column(
        ForeignKey("types_of_feeding.id", ondelete="CASCADE")
    )
    name: Mapped[str] = mapped_column(String(100))

    species: Mapped[list["Species"]] = relationship(back_populates="animal_group")
    type_of_feeding: Mapped["TypeOfFeeding"] = relationship(
        back_populates="animal_groups", lazy="joined"
    )

    def __repr__(self) -> str:
        return self.name
