from typing import TYPE_CHECKING

from slugify import slugify
from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from core.models import DoctorInVetWork, VetWork

    from .company import Company
    from .position import Position


class Employee(Base):
    """Класс Работник"""

    __tablename__ = "employees"

    company_id: Mapped[int] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE")
    )
    position_id: Mapped[int] = mapped_column(
        ForeignKey("positions.id", ondelete="CASCADE")
    )
    lastname: Mapped[str] = mapped_column(String(50))
    firstname: Mapped[str] = mapped_column(String(30))
    patronymic: Mapped[str] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    company: Mapped["Company"] = relationship(back_populates="employees", lazy="joined")
    position: Mapped["Position"] = relationship(
        back_populates="employees", lazy="joined"
    )

    vetworks: Mapped[list["VetWork"]] = relationship(
        back_populates="doctors", secondary="doctors_in_vetwork"
    )

    vetworks_details: Mapped[list["DoctorInVetWork"]] = relationship(
        back_populates="doctor"
    )

    @property
    def fullname(self):
        return get_full_name(
            lastname=self.lastname, firstname=self.firstname, patronymic=self.patronymic
        )

    @property
    def employee_slug(self):
        return slugify(
            get_full_name(
                lastname=self.lastname,
                firstname=self.firstname,
                patronymic=self.patronymic,
            )
        )

    def __repr__(self) -> str:
        return self.fullname


def get_full_name(lastname: str, firstname: str, patronymic: str) -> str:
    return f"{lastname.capitalize()} {firstname[0].upper()}. {patronymic[0].upper()}."
