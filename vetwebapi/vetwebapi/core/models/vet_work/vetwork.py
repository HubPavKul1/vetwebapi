from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from core.models import Animal, Clinic, Company, DrugMovement, Employee, Laboratory

    from .animal_in_vetwork import AnimalInVetWork
    from .biomaterial import Biomaterial
    from .biomaterial_fixation import BiomaterialFixation
    from .biomaterial_package import BiomaterialPackage
    from .company_in_vetwork import CompanyInVetWork
    from .diagnostic_method import DiagnosticMethod
    from .disease import Disease
    from .disease_in_vetwork import DiseaseInVetWork
    from .doctor_in_vetwork import DoctorInVetWork
    from .vetwork_file import VetWorkFile
    from .work_type import WorkType


class VetWork(Base):
    """Модель ПЭМ"""

    __tablename__ = "vetworks"

    work_type_id: Mapped[int] = mapped_column(ForeignKey("work_types.id", ondelete="CASCADE"))
    vetwork_date: Mapped[date]
    is_state_assignment: Mapped[bool] = mapped_column(Boolean, default=False)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=True)
    clinic_id: Mapped[int] = mapped_column(ForeignKey("clinics.id", ondelete="CASCADE"))
    laboratory_id: Mapped[int | None] = mapped_column(
        ForeignKey("laboratories.id", ondelete="CASCADE")
    )
    biomaterial_id: Mapped[int | None] = mapped_column(
        ForeignKey("biomaterials.id", ondelete="CASCADE")
    )
    biomaterial_package_id: Mapped[int | None] = mapped_column(
        ForeignKey("biomaterial_packages.id", ondelete="CASCADE")
    )
    biomaterial_fixation_id: Mapped[int | None] = mapped_column(
        ForeignKey("biomaterial_fixations.id", ondelete="CASCADE")
    )
    diagnostic_method_id: Mapped[int | None] = mapped_column(
        ForeignKey("diagnostic_methods.id", ondelete="CASCADE")
    )
    drug_movement_id: Mapped[int | None] = mapped_column(
        ForeignKey("drug_movements.id", ondelete="CASCADE")
    )

    work_type: Mapped["WorkType"] = relationship(back_populates="vetworks", lazy="joined")
    clinic: Mapped["Clinic"] = relationship(back_populates="vetworks", lazy="joined")
    laboratory: Mapped["Laboratory"] = relationship(back_populates="vetworks", lazy="joined")
    biomaterial: Mapped["Biomaterial"] = relationship(back_populates="vetworks", lazy="joined")
    biomaterial_package: Mapped["BiomaterialPackage"] = relationship(
        back_populates="vetworks", lazy="joined"
    )
    biomaterial_fixation: Mapped["BiomaterialFixation"] = relationship(
        back_populates="vetworks", lazy="joined"
    )
    diagnostic_method: Mapped["DiagnosticMethod"] = relationship(
        back_populates="vetworks", lazy="joined"
    )

    animals: Mapped[list["Animal"]] = relationship(
        back_populates="vetworks", secondary="animals_in_vetwork"
    )

    vetwork_file: Mapped["VetWorkFile"] = relationship(back_populates="vetwork")

    animals_details: Mapped[list["AnimalInVetWork"]] = relationship(
        back_populates="vetwork", cascade="all, delete"
    )

    doctors: Mapped[list["Employee"]] = relationship(
        back_populates="vetworks", secondary="doctors_in_vetwork"
    )

    doctors_details: Mapped[list["DoctorInVetWork"]] = relationship(
        back_populates="vetwork", cascade="all, delete"
    )

    diseases: Mapped[list["Disease"]] = relationship(
        back_populates="vetworks", secondary="diseases_in_vetwork"
    )

    diseases_details: Mapped[list["DiseaseInVetWork"]] = relationship(
        back_populates="vetwork", cascade="all, delete"
    )

    drug_movement: Mapped["DrugMovement"] = relationship(back_populates="vetwork")

    companies: Mapped[list["Company"]] = relationship(
        back_populates="vetworks", secondary="companies_in_vetwork"
    )

    companies_details: Mapped[list["CompanyInVetWork"]] = relationship(
        back_populates="vetwork", cascade="all, delete"
    )

    def __repr__(self) -> str:
        return f"{self.work_type.name}:{self.vetwork_date}"
