from typing import TYPE_CHECKING

from slugify import slugify
from sqlalchemy import Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import BaseNoPk, intpk

if TYPE_CHECKING:
    from vetwebapi.core.models import Animal, CompanyInVetWork, VetWork

    from .address import Address
    from .employee import Employee


class Company(BaseNoPk):
    """класс Компания"""

    __tablename__ = "companies"

    id: Mapped[intpk]
    full_name: Mapped[str]
    short_name: Mapped[str]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    type: Mapped[str]

    addresses: Mapped["Address"] = relationship(
        back_populates="company", cascade="all, delete", lazy="joined"
    )
    employees: Mapped[list["Employee"]] = relationship(
        back_populates="company", cascade="all, delete", lazy="selectin"
    )
    animals: Mapped[list["Animal"]] = relationship(
        back_populates="company", cascade="all, delete"
    )
    vetworks: Mapped[list["VetWork"]] = relationship(
        back_populates="companies", secondary="companies_in_vetwork"
    )
    vetworks_details: Mapped[list["CompanyInVetWork"]] = relationship(
        back_populates="company"
    )

    @property
    def company_slug(self):
        return slugify(self.short_name)

    __mapper_args__ = {"polymorphic_identity": "company", "polymorphic_on": "type"}

    def __repr__(self) -> str:
        return self.short_name
