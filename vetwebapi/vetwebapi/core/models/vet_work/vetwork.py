from typing import TYPE_CHECKING
from datetime import date

from sqlalchemy import ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .work_type import WorkType
    from .biomaterial import Biomaterial
    from vetwebapi.core.models import Company, Animal, Employee
    from .biomaterial_package import BiomaterialPackage
    from .biomaterial_fixation import BiomaterialFixation
    from .animal_in_vetwork import AnimalInVetWork
    from .doctor_in_vetwork import DoctorInVetWork
    from .diagnostic_method import DiagnosticMethod
    from .disease import Disease
    from .disease_in_vetwork import DiseaseInVetWork


class VetWork(Base):
    """Модель ПЭМ"""

    __tablename__ = "vetworks"
    
    work_type_id: Mapped[int] = mapped_column(
        ForeignKey("work_types.id", ondelete="CASCADE")
        )
    vetwork_date: Mapped[date]
    is_state_assignment: Mapped[bool] = mapped_column(Boolean, default=False)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=True)
    clinic_id: Mapped[int] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE")
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
    diagnostic_method_id: Mapped[int | None] =  mapped_column(
        ForeignKey("diagnostic_methods.id", ondelete="CASCADE")
        )
    

    work_type: Mapped["WorkType"] = relationship(back_populates="vetworks", lazy="joined")
    clinic: Mapped["Company"] = relationship(back_populates="vetworks", lazy="joined")
    biomaterial: Mapped["Biomaterial"] = relationship(back_populates="vetworks", lazy="joined")
    biomaterial_package: Mapped["BiomaterialPackage"] = relationship(back_populates="vetworks", lazy="joined")
    biomaterial_fixation: Mapped["BiomaterialFixation"] = relationship(back_populates="vetworks", lazy="joined")
    diagnostic_method: Mapped["DiagnosticMethod"] = relationship(back_populates="vetworks", lazy="joined")

    animals: Mapped[list["Animal"]] = relationship(
        back_populates="vetworks", secondary="animals_in_vetwork"
    )
    animals_details: Mapped[list["AnimalInVetWork"]] = relationship(
        back_populates="vetwork"
    )


    doctors: Mapped[list["Employee"]] = relationship(
         back_populates="vetworks", secondary="doctors_in_vetwork"
    )

    doctors_details: Mapped[list["DoctorInVetWork"]] = relationship(
        back_populates="vetwork"
    )

    diseases: Mapped[list["Disease"]] = relationship(
         back_populates="vetworks", secondary="diseases_in_vetwork"
    )

    diseases_details: Mapped[list["DiseaseInVetWork"]] = relationship(
        back_populates="vetwork"
    )


    def __repr__(self) -> str:
        return f"{self.work_type.name}:{self.vetwork_date}"
