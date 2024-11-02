from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column

from core.models.base import Base


class PlaceOfAdministration(Base):
    """Модель Место введения препарата"""

    __tablename__ = "places_of_administration"

    name: Mapped[str] = mapped_column(Text)

    def __repr__(self) -> str:
        return self.name
