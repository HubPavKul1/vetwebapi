from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base


class AccountingUnit(Base):
    """Модель Единица учета препарата"""
    
    __tablename__ = "accounting_units"
    
    name: Mapped[str] = mapped_column(String(100))
    
    def __repr__(self):
        return self.name