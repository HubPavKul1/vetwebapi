from typing import TYPE_CHECKING

from slugify import slugify
from sqlalchemy import Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from vetwebapi.core.models import Animal, VetWork, CompanyInVetWork

    from .address import Address
    from .employee import Employee


class Company(Base):
    """класс Компания"""

    __tablename__ = "companies"

    full_name: Mapped[str]
    short_name: Mapped[str]
    is_vet: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    addresses: Mapped["Address"] = relationship(back_populates="company", cascade="all, delete", lazy="joined")
    employees: Mapped[list["Employee"]] = relationship(
        back_populates="company", 
        cascade="all, delete",
        lazy="selectin" 
    )
    animals: Mapped[list["Animal"]] = relationship(back_populates="company", cascade="all, delete")
    vetworks: Mapped[list["VetWork"]] = relationship(back_populates="clinic", cascade="all, delete")

    vetworks: Mapped[list["VetWork"]] = relationship(
        back_populates="companies", secondary="companies_in_vetwork"
    )
    vetworks_details: Mapped[list["CompanyInVetWork"]] = relationship(
        back_populates="company"
    )

    @property
    def company_slug(self):
        return slugify(self.short_name)

    def __repr__(self) -> str:
        return self.short_name
