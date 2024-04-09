import os
from typing import TYPE_CHECKING


from sqlalchemy import ForeignKey, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from vetwebapi.core.models import Disease
    from .drug_manufacturer import DrugManufacturer
    from .budget import Budget
    from .accounting_unit import AccountingUnit
    from .catalog_drug import CatalogDrug
   


class Drug(Base):
    """Модель Препарат"""
    
    __tablename__ = "drugs"
    
    disease_id: Mapped[int] = mapped_column(ForeignKey("diseases.id", ondelete="CASCADE"))
    drug_manufacturer_id: Mapped[int] = mapped_column(ForeignKey("drug_manufacturers.id", ondelete="CASCADE"))
    budget_id: Mapped[int] = mapped_column(ForeignKey("budgets.id", ondelete="CASCADE"))
    accounting_unit_id: Mapped[int] = mapped_column(ForeignKey("accounting_units.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(300))
   
    packing: Mapped[float]
    instruction: Mapped[str | None]
    image: Mapped[str | None]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    
    disease: Mapped["Disease"] = relationship(back_populates="drugs", lazy="joined")
    drug_manufacturer: Mapped["DrugManufacturer"] = relationship(back_populates="drugs", lazy="joined")
    budget: Mapped["Budget"] = relationship(back_populates="drugs", lazy="joined")  
    accounting_unit: Mapped["AccountingUnit"] = relationship(back_populates="drugs", lazy="joined")
    catalog_drugs: Mapped[list["CatalogDrug"]] = relationship(back_populates="drug")
    
    
    def image_path(self, filename: str) -> str:
        """Create relative path for drug_image"""
        return os.path.join("drugs", "images", filename)
    
    def instruction_path(self, filename: str) -> str:
        """Create relative path for drug_instruction"""
        return os.path.join("drugs", "instr", filename)
    
    
    def __repr__(self) -> str:
        return f"{self.name}"