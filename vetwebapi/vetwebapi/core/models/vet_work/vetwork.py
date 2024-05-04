from typing import TYPE_CHECKING
from datetime import date

from sqlalchemy import String, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .work_type import WorkType
    from .biomaterial import Biomaterial
    from vetwebapi.core.models import Company
    from .biomaterial_package import BiomaterialPackage
    from .fixation_biomaterial import FixationBiomaterial

    


class VetWork(Base):
    """Модель ПЭМ"""

    __tablename__ = "vetworks"
    
    work_type_id: Mapped[int] = mapped_column(ForeignKey("work_types.id", ondelete="CASCADE"))
    vetwork_date: Mapped[date]
    is_state_assignment: Mapped[bool] = mapped_column(Boolean, default=False, server_default=False)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=True, server_default=True)
    clinic_id: Mapped[int] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))
    laboratory_id: Mapped[int] | None = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE")
        )
    biomaterial_id: Mapped[int] | None = mapped_column(
        ForeignKey("biomaterials.id", ondelete="CASCADE")
        )
    biomaterial_package_id: Mapped[int] | None = mapped_column(
        ForeignKey("biomaterial_packages.id", ondelete="CASCADE")
        )
    fixation_biomaterial_id: Mapped[int] | None = mapped_column(
        ForeignKey("fixations_biomaterial.id", ondelete="CASCADE")
        )

    work_type: Mapped["WorkType"] = relationship(back_populates="vetworks", lazy="joined")
    clinic: Mapped["Company"] = relationship(back_populates="vetworks", lazy="joined")
    laboratory: Mapped["Company"] = relationship(back_populates="vetworks", lazy="joined")
    biomaterial: Mapped["Biomaterial"] = relationship(back_populates="vetworks", lazy="joined")
    biomaterial_package: Mapped["BiomaterialPackage"] = relationship(back_populates="vetworks", lazy="joined")
    fixation_biomaterial: Mapped["FixationBiomaterial"] = relationship(back_populates="vetworks", lazy="joined")

    def __repr__(self) -> str:
        return f"{self.work_type.name}:{self.vetwork_date}"
