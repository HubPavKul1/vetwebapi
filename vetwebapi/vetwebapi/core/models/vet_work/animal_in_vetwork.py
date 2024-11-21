from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from core.models import Animal

    from .vetwork import VetWork


class AnimalInVetWork(Base):
    """Класс Опись Животных"""

    __tablename__ = "animals_in_vetwork"
    __table_args__ = (
        UniqueConstraint(
            "vetwork_id", "animal_id", name="idx_unique_animal_in_vetwork"
        ),
    )

    vetwork_id: Mapped[int] = mapped_column(ForeignKey("vetworks.id"))
    animal_id: Mapped[int] = mapped_column(ForeignKey("animals.id"))

    dosage: Mapped[float | None]
    is_positive: Mapped[bool] = mapped_column(Boolean, default=False)

    vetwork: Mapped["VetWork"] = relationship(back_populates="animals_details")
    animal: Mapped["Animal"] = relationship(back_populates="vetworks_details")
