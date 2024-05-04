from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .drug import Drug


class AdministrationMethod(Base):
    """Модель Способ применения препарата"""

    __tablename__ = "administration_methods"

    name: Mapped[str] = mapped_column(String(50))

    drugs: Mapped[list["Drug"]] = relationship(back_populates="administration_method")

    def __repr__(self) -> str:
        return self.name
