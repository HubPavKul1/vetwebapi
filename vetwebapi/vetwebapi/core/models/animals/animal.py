from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, String, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from vetwebapi.core.models import Company

    from .gender import Gender
    from .species import Species
    from .usage_type import UsageType


class Animal(Base):
    """Класс Животное"""

    __tablename__ = "animals"

    species_id: Mapped[int] = mapped_column(ForeignKey("species.id", ondelete="CASCADE"))
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))
    usage_type_id: Mapped[int] = mapped_column(ForeignKey("usage_types.id", ondelete="CASCADE"))
    gender_id: Mapped[int] = mapped_column(ForeignKey("genders.id", ondelete="CASCADE"))
    date_of_birth: Mapped[date]
    nickname: Mapped[str] = mapped_column(String(100))
    identification: Mapped[str] = mapped_column(String(15))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    species: Mapped["Species"] = relationship(back_populates="animals", lazy="joined")
    company: Mapped["Company"] = relationship(back_populates="animals")
    usage_type: Mapped["UsageType"] = relationship(back_populates="animals", lazy="joined")
    gender: Mapped["Gender"] = relationship(back_populates="animals", lazy="joined")

    def __repr__(self) -> str:
        return f"{self.species.name}: {self.nickname}"
