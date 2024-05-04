from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .vetwork import VetWork


class FixationBiomaterial(Base):
    """Модель Биоматериал"""

    __tablename__ = "fixations_biomaterial"

    name: Mapped[str] = mapped_column(String(300))

    vetworks: Mapped[list["VetWork"]] = relationship(back_populates="fixation_biomaterial")

    def __repr__(self) -> str:
        return self.name
