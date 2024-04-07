
from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, UniqueConstraint, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .catalog_drug import CatalogDrug
    from .drug_movement import DrugMovement


class DrugInMovement(Base):
    """Класс Перемещаемый Препарат (Many-To-Many Препарат и Перемещение препарата)"""
    
    __tablename__ = "drugs_in_movement"
    __table_args__= (
        UniqueConstraint(
            "drug_movement_id", 
            "catalog_drug_id", 
            name="idx_unique_drug_in_movement"
            ),
    )
    
    drug_movement_id: Mapped[int] = mapped_column(ForeignKey("drug_movements.id"))
    catalog_drug_id: Mapped[int] = mapped_column(ForeignKey("catalog_drugs.id"))
    
    packs_amount: Mapped[int] 
    units_amount: Mapped[float]
    
    drug_movement: Mapped["DrugMovement"] = relationship(back_populates="catalog_drugs_details")
    catalog_drug: Mapped["CatalogDrug"] = relationship(back_populates="drug_movements_details")
    
   
    