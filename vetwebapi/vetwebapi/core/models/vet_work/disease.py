from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from vetwebapi.core.models import Drug
    from .vetwork import VetWork
    from .disease_in_vetwork import DiseaseInVetWork


class Disease(Base):
    """Модель Заболевание"""

    __tablename__ = "diseases"

    name: Mapped[str] = mapped_column(String(300))

    drugs: Mapped[list["Drug"]] = relationship(back_populates="disease")

    vetworks: Mapped[list["VetWork"]] = relationship(
        back_populates="diseases", secondary="diseases_in_vetwork"
    )
    vetworks_details: Mapped[list["DiseaseInVetWork"]] = relationship(
        back_populates="disease"
    )

    def __repr__(self) -> str:
        return self.name
