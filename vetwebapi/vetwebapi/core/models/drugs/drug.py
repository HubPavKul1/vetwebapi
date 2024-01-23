from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from vetwebapi.core.models import Disease
    from .drug_manufacturer import DrugManufacturer
    from .budget import Budget


class Drug(Base):
    """Модель Препарат"""
    
    __tablename__ = "drugs"
    
    disease_id: Mapped[int] = mapped_column(ForeignKey("diseases.id", ondelete="CASCADE"))
    drug_manufacturer_id: Mapped[int] = mapped_column(ForeignKey("drug_manufacturers.id", ondelete="CASCADE"))
    budget_id: Mapped[int] = mapped_column(ForeignKey("budgets.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(300))
    
    disease: Mapped["Disease"] = relationship(back_populates="drugs", lazy="joined")
    drug_manufacturer: Mapped["DrugManufacturer"] = relationship(back_populates="drug_manufacturer", lazy="joined")
    budget: Mapped["Budget"] = relationship(back_populates="drugs", lazy="joined")
    instruction: Mapped[str]
    
    
    def __repr__(self):
        return self.name