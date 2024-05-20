from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .vetwork import VetWork
    from vetwebapi.core.models import Company


class CompanyInVetWork(Base):
    """Класс Предприятие ПЭМ"""

    __tablename__ = "companies_in_vetwork"
    __table_args__ = (
        UniqueConstraint("vetwork_id", "company_id", name="idx_unique_company_in_vetwork"),
    )

    vetwork_id: Mapped[int] = mapped_column(ForeignKey("vetworks.id"))
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"))

    vetwork: Mapped["VetWork"] = relationship(back_populates="companies_details")
    company: Mapped["Company"] = relationship(back_populates="vetworks_details" )
