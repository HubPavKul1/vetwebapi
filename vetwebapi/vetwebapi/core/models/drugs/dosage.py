from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base


class Dosage(Base):
    """Модель Дозировка препарата"""
    
    __tablename__ = "dosages"
    
    name: Mapped[str] = mapped_column(String(300))
    
    def __repr__(self):
        return self.name