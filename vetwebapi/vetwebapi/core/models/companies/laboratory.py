from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .company import Company

if TYPE_CHECKING:
    from core.models import VetWork


class Laboratory(Company):
    """класс Лаборатория"""

    __tablename__ = "laboratories"

    id: Mapped[int] = mapped_column(ForeignKey("companies.id"), primary_key=True)

    vetworks: Mapped[list["VetWork"]] = relationship(
        back_populates="laboratory", cascade="all, delete"
    )

    __mapper_args__ = {"polymorphic_identity": "laboratory"}
