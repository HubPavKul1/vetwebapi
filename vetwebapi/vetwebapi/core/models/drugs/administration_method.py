from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base


class AdministrationMethod(Base):
    """Модель Способ применения препарата"""
    
    __tablename__ = "administration_methods"
    
    name: Mapped[str] = mapped_column(String(50))
    
    def __repr__(self) -> str:
        return self.name