from datetime import date

from sqlalchemy import ForeignKey, String, Boolean, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from vetwebapi.core.models.base import Base


    
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
    
    butch: Mapped[str] = mapped_column(String(10))
    control: Mapped[str] = mapped_column(String(10))
    production_date: Mapped[date]
    expiration_date: Mapped[date]
    packing: Mapped[float]
    packs_amount: Mapped[int] 
    units_amount: Mapped[float]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    
    