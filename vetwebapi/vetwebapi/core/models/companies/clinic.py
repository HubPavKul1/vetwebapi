from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models import Company

if TYPE_CHECKING:
    from vetwebapi.core.models import VetWork


class Clinic(Company):
    """класс Ветклиника"""

    __tablename__ = "clinics"

    id: Mapped[int] = mapped_column(ForeignKey("companies.id"), primary_key=True)

    vetworks: Mapped[list["VetWork"]] = relationship(
        back_populates="clinic", cascade="all, delete"
    )
    

   
    __mapper_args__ = {"polymorphic_identity": "clinic"}

   
