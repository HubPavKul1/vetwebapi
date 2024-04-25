from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .animal import Animal, Species


class Gender(Base):
    """Класс Пол животного"""

    __tablename__ = "genders"

    species_id: Mapped[int] = mapped_column(ForeignKey("species.id", ondelete="CASCADE"))

    name: Mapped[str] = mapped_column(String(100))

    animals: Mapped[list["Animal"]] = relationship(back_populates="gender")
    species: Mapped["Species"] = relationship(back_populates="genders", lazy="joined")

    def __repr__(self) -> str:
        return self.name
