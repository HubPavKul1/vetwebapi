from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

# from core.models.base import Base
from ...models import Base

if TYPE_CHECKING:
    # from core.models import Drug
    from ..drugs.drug import Drug
    from ..drugs.drug_disease import DrugDisease
    from .disease_in_vetwork import DiseaseInVetWork
    from .vetwork import VetWork


class Disease(Base):
    """Модель Заболевание"""

    __tablename__ = "diseases"

    name: Mapped[str] = mapped_column(String(300))

    drugs: Mapped[list["Drug"]] = relationship(back_populates="diseases", secondary="drug_diseases")
    drugs_details: Mapped[list["DrugDisease"]] = relationship(back_populates="disease")

    vetworks: Mapped[list["VetWork"]] = relationship(
        back_populates="diseases", secondary="diseases_in_vetwork"
    )
    vetworks_details: Mapped[list["DiseaseInVetWork"]] = relationship(back_populates="disease")

    def __repr__(self) -> str:
        return self.name
