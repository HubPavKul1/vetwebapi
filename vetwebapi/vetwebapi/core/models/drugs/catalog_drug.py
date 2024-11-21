from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from .drug import Drug
    from .drug_in_movement import DrugInMovement
    from .drug_movement import DrugMovement


class CatalogDrug(Base):
    """Модель Каталог Препаратов"""

    __tablename__ = "catalog_drugs"

    drug_id: Mapped[int] = mapped_column(ForeignKey("drugs.id", ondelete="CASCADE"))
    batch: Mapped[str] = mapped_column(String(10))
    control: Mapped[str] = mapped_column(String(10))
    production_date: Mapped[date]
    expiration_date: Mapped[date]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    drug: Mapped["Drug"] = relationship(back_populates="catalog_drugs", lazy="joined")

    # ассоциация с DrugMovement
    drug_movements: Mapped[list["DrugMovement"]] = relationship(
        back_populates="catalog_drugs", secondary="drugs_in_movement"
    )
    drug_movements_details: Mapped[list["DrugInMovement"]] = relationship(
        back_populates="catalog_drug"
    )

    def __repr__(self) -> str:
        return f"{self.drug.name} серия:{self.batch}"
