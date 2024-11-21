from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .vetwork import VetWork


class BiomaterialPackage(Base):
    """Модель Упаковка Биоматериала"""

    __tablename__ = "biomaterial_packages"

    name: Mapped[str] = mapped_column(String(300))

    vetworks: Mapped[list["VetWork"]] = relationship(
        back_populates="biomaterial_package"
    )

    def __repr__(self) -> str:
        return self.name
