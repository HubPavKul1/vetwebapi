from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .drug import Drug
    from ..vet_work.disease import Disease


class DrugDisease(Base):
    """Класс Заболевание ПЭМ"""

    __tablename__ = "drug_diseases"
    __table_args__ = (UniqueConstraint("drug_id", "disease_id", name="idx_unique_drug_disease"),)

    drug_id: Mapped[int] = mapped_column(ForeignKey("drugs.id"))
    disease_id: Mapped[int] = mapped_column(ForeignKey("diseases.id"))

    drug: Mapped["Drug"] = relationship(back_populates="diseases_details")
    disease: Mapped["Disease"] = relationship(back_populates="drugs_details")
