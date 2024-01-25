from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .drug import Drug


class DrugManufacturer(Base):
    """Модель Производитель препарата"""
    
    __tablename__ = "drug_manufacturers"
    
    name: Mapped[str] = mapped_column(String(100))
    
    drugs: Mapped[list["Drug"]] = relationship(back_populates="drug_manufacturer") 
    
    def __repr__(self) -> str:
        return self.name