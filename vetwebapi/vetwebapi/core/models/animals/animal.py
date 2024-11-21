from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from core.models import AnimalInVetWork, Company, VetWork

    from .gender import Gender
    from .species import Species
    from .usage_type import UsageType


class Animal(Base):
    """Класс Животное"""

    __tablename__ = "animals"

    species_id: Mapped[int] = mapped_column(
        ForeignKey("species.id", ondelete="CASCADE")
    )
    company_id: Mapped[int] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE")
    )
    usage_type_id: Mapped[int] = mapped_column(
        ForeignKey("usage_types.id", ondelete="CASCADE")
    )
    gender_id: Mapped[int] = mapped_column(ForeignKey("genders.id", ondelete="CASCADE"))
    date_of_birth: Mapped[date]
    nickname: Mapped[str] = mapped_column(String(100))
    identification: Mapped[str] = mapped_column(String(15))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    species: Mapped["Species"] = relationship(back_populates="animals", lazy="joined")
    company: Mapped["Company"] = relationship(back_populates="animals", lazy="joined")
    usage_type: Mapped["UsageType"] = relationship(
        back_populates="animals", lazy="joined"
    )
    gender: Mapped["Gender"] = relationship(back_populates="animals", lazy="joined")

    vetworks: Mapped[list["VetWork"]] = relationship(
        back_populates="animals", secondary="animals_in_vetwork"
    )
    vetworks_details: Mapped[list["AnimalInVetWork"]] = relationship(
        back_populates="animal"
    )

    def __repr__(self) -> str:
        return f"{self.species.name}: {self.nickname}"
