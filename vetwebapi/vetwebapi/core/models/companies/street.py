from typing import TYPE_CHECKING

from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..base import Base

if TYPE_CHECKING:
    from .city import City
    


class Street(Base):
    """Класс улица"""
    __tablename__ = "streets"
    
    city_id: Mapped[int] = mapped_column(ForeignKey("cities.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(250))
    
    city: Mapped["City"] = relationship(back_populates="streets")
    
    
    def __repr__(self):
        return self.name