from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .catalog_drug import CatalogDrug
    from .drug_in_movement import DrugInMovement
    from .operation import Operation
    from vetwebapi.core.models import VetWork


class DrugMovement(Base):
    """Класс Движение Препарата"""

    __tablename__ = "drug_movements"

    operation_id: Mapped[int] = mapped_column(ForeignKey("operations.id", ondelete="CASCADE"))
    operation_date: Mapped[date]

    operation: Mapped["Operation"] = relationship(back_populates="drug_movement", lazy="joined")

    # Ассоциация с Drug
    catalog_drugs: Mapped[list["CatalogDrug"]] = relationship(
        back_populates="drug_movements", secondary="drugs_in_movement"
    )
    catalog_drugs_details: Mapped[list["DrugInMovement"]] = relationship(
        back_populates="drug_movement"
    )
    
    vetwork: Mapped["VetWork"] = relationship(
        back_populates="drug_movement", uselist=False
    )

    def __repr__(self) -> str:
        return f"{self.operation.name}:{self.operation_date}"
