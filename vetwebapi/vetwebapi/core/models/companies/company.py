from slugify import slugify
from sqlalchemy.orm import Mapped

from ..base import Base


class Company(Base):
    """класс Компания"""
    __tablename__ = "companies"
    
    full_name: Mapped[str]
    short_name: Mapped[str]
    
    @property
    def company_slug(self):
        return slugify(self.short_name)
        
        
    def __repr__(self) -> str:
        return self.short_name
    
    
    