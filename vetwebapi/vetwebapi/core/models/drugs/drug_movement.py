from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .operation import Operation
    from .drug import Drug


class DrugMovement(Base):
    """Класс Движение Препарата"""
    
    __tablename__ = "drug_movements"
    
    operation_id: Mapped[int] = mapped_column(ForeignKey("operations.id", ondelete="CASCADE"))
    operation_date: Mapped[date] 
    
    operation: Mapped["Operation"] = relationship(back_populates="drug_movement", lazy="joined")
    drugs: Mapped[list["Drug"]] = relationship(back_populates="drug_movements", secondary="drugs_in_movement")
    
    def __repr__(self):
        return f"{self.operation.name}:{self.operation_date}"
    
    