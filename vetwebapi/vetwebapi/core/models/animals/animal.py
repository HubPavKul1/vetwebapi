from typing import TYPE_CHECKING

from sqlalchemy import String, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .species import Species
    from vetwebapi.core.models import Company


class Animal(Base):
    """Класс Вид животных"""

    __tablename__ = "animals"
    
    species_id: Mapped[int] = mapped_column(ForeignKey("species.id", ondelete="CASCADE"))
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))
    sex: Mapped[str]
    date_of_birth: Mapped[str]
    nickname: Mapped[str] = mapped_column(String(100))
    identification: Mapped[str]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    usage: Mapped[str] = mapped_column(String(100))

    species: Mapped["Species"] = relationship(back_populates="animals")
    company: Mapped["Company"] = relationship(back_populates="animals")

    def __repr__(self):
        return self.name