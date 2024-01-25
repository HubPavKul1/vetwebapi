from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .drug import Drug
    from .drug_movement import DrugMovement


class DrugInMovement(Base):
    """Класс Перемещаемый Препарат (Many-To-Many Препарат и Перемещение препарата)"""
    
    __tablename__ = "drugs_in_movement"
    __table_args__= (
        UniqueConstraint(
            "drug_movement_id", 
            "drug_id", 
            name="idx_unique_drug_in_movement"
            ),
    )
    
    drug_movement_id: Mapped[int] = mapped_column(ForeignKey("drug_movements.id"))
    drug_id: Mapped[int] = mapped_column(ForeignKey("drugs.id"))
    
    drug_movement: Mapped["DrugMovement"] = relationship(back_populates="drugs_details")
    drug: Mapped["Drug"] = relationship(back_populates="drug_movements_details")
    
    packs_amount: Mapped[int] 
    units_amount: Mapped[float]
    