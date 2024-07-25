from typing import TYPE_CHECKING

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .drug import Drug


class DisposalMethod(Base):
    """Модель Способ Уничтожения Остатков Препарата"""

    __tablename__ = "disposal_methods"

    name: Mapped[str] = mapped_column(Text)

    drugs: Mapped[list["Drug"]] = relationship(back_populates="disposal_method")

    def __repr__(self) -> str:
        return self.name
