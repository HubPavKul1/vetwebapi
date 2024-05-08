from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .vetwork import VetWork
    from .disease import Disease


class DiseaseInVetWork(Base):
    """Класс Заболевание ПЭМ"""

    __tablename__ = "diseases_in_vetwork"
    __table_args__ = (
        UniqueConstraint("vetwork_id", "disease_id", name="idx_unique_disease_in_vetwork"),
    )

    vetwork_id: Mapped[int] = mapped_column(ForeignKey("vetworks.id"))
    disease_id: Mapped[int] = mapped_column(ForeignKey("diseases.id"))

    vetwork: Mapped["VetWork"] = relationship(back_populates="diseases_details")
    disease: Mapped["Disease"] = relationship(back_populates="vetworks_details")
