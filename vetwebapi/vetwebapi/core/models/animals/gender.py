from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .animal import Animal


class Gender(Base):
    """Класс Пол животного"""

    __tablename__ = "genders"

    name: Mapped[str] = mapped_column(String(100))

    animals: Mapped[list["Animal"]] = relationship(back_populates="gender")

    def __repr__(self):
        return self.name
