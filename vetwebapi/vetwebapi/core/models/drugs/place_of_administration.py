from typing import TYPE_CHECKING

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .drug import Drug

class PlaceOfAdministration(Base):
    """Модель Место введения препарата"""

    __tablename__ = "places_of_administration"

    name: Mapped[str] = mapped_column(Text)

    drugs: Mapped[list["Drug"]] = relationship(back_populates="place_of_administration")

    def __repr__(self) -> str:
        return self.name
