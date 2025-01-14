import os
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base
from core.settings import settings

if TYPE_CHECKING:
    from vetwebapi.core.models import Disease

    from .accounting_unit import AccountingUnit
    from .budget import Budget
    from .catalog_drug import CatalogDrug
    from .disposal_method import DisposalMethod
    from .dosage import Dosage
    from .drug_disease import DrugDisease
    from .drug_manufacturer import DrugManufacturer


class Drug(Base):
    """Модель Препарат"""

    __tablename__ = "drugs"

    drug_manufacturer_id: Mapped[int] = mapped_column(
        ForeignKey("drug_manufacturers.id", ondelete="CASCADE")
    )
    budget_id: Mapped[int] = mapped_column(ForeignKey("budgets.id", ondelete="CASCADE"))
    accounting_unit_id: Mapped[int] = mapped_column(
        ForeignKey("accounting_units.id", ondelete="CASCADE")
    )
    disposal_method_id: Mapped[int] = mapped_column(
        ForeignKey("disposal_methods.id", ondelete="CASCADE")
    )
    dosage_id: Mapped[int] = mapped_column(ForeignKey("dosages.id", ondelete="CASCADE"))

    name: Mapped[str] = mapped_column(String(300))
    instruction: Mapped[str | None]
    image: Mapped[str | None]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    diseases: Mapped[list["Disease"]] = relationship(
        back_populates="drugs", secondary="drug_diseases"
    )

    diseases_details: Mapped[list["DrugDisease"]] = relationship(
        back_populates="drug", cascade="all, delete"
    )
    drug_manufacturer: Mapped["DrugManufacturer"] = relationship(
        back_populates="drugs", lazy="joined"
    )
    budget: Mapped["Budget"] = relationship(back_populates="drugs", lazy="joined")
    accounting_unit: Mapped["AccountingUnit"] = relationship(
        back_populates="drugs", lazy="joined"
    )
    catalog_drugs: Mapped[list["CatalogDrug"]] = relationship(back_populates="drug")
    disposal_method: Mapped["DisposalMethod"] = relationship(
        back_populates="drugs", lazy="joined"
    )
    dosage: Mapped["Dosage"] = relationship(back_populates="drugs", lazy="joined")

    def image_path(self, filename: str) -> str:
        """Create relative path for drug_image"""
        drug_image_dir = os.path.join(settings.media_dir, "drugs", "images")
        if not os.path.isdir(drug_image_dir):
            os.mkdir(drug_image_dir)
        return os.path.join("drugs", "images", filename)

    def instruction_path(self, filename: str) -> str:
        """Create relative path for drug_instruction"""
        drug_instr_dir = os.path.join(settings.media_dir, "drugs", "instr")
        if not os.path.isdir(drug_instr_dir):
            os.mkdir(drug_instr_dir)
        return os.path.join("drugs", "instr", filename)

    def __repr__(self) -> str:
        return f"{self.name}"
