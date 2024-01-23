from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base


class PlaceOfAdministration(Base):
    """Модель Место введения препарата"""
    
    __tablename__ = "places_of_administration"
    
    name: Mapped[str] = mapped_column(String(300))
    
    def __repr__(self):
        return self.name