from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .vetwork import VetWork


class Biomaterial(Base):
    """Модель Биоматериал"""

    __tablename__ = "biomaterials"

    name: Mapped[str] = mapped_column(String(300))

    vetworks: Mapped[list["VetWork"]] = relationship(back_populates="biomaterial")

    def __repr__(self) -> str:
        return self.name
