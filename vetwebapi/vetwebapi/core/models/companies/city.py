from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from ..base import Base


class City(Base):
    """Класс город"""
    __tablename__ = "cities"
    
    name: Mapped[str] = mapped_column(String(100))
    
    def __repr__(self):
        return self.name
    




