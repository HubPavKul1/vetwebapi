from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from vetwebapi.core.models import Drug


class Disease(Base):
    """Модель Заболевание"""
    
    __tablename__ = "diseases"
    
    name: Mapped[str] = mapped_column(String(300))
    
    drugs: Mapped[list["Drug"]] = relationship(back_populates="disease")
    
    def __repr__(self) -> str:
        return self.name