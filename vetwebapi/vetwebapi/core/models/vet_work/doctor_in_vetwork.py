from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Boolean, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .vetwork import VetWork
    from vetwebapi.core.models import Employee


class DoctorInVetWork(Base):
    """Класс Ветврач и ПЭМ"""

    __tablename__ = "doctors_in_vetwork"
    __table_args__ = (
        UniqueConstraint("vetwork_id", "employee_id", name="idx_unique_doctor_in_vetwork"),
    )

    vetwork_id: Mapped[int] = mapped_column(ForeignKey("vetworks.id"))
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"))


    vetwork: Mapped["VetWork"] = relationship(back_populates="doctors_details")
    doctor: Mapped["Employee"] = relationship(back_populates="vetworks_details")
