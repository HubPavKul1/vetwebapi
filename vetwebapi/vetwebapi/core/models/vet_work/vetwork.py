from typing import TYPE_CHECKING
from datetime import date

from sqlalchemy import String, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from vetwebapi.core.models import WorkType
    


class VetWork(Base):
    """Модель ПЭМ"""

    __tablename__ = "vetworks"
    
    work_type_id: Mapped[int] = mapped_column(ForeignKey("work_types.id", ondelete="CASCADE"))
    vetwork_date: Mapped[date]
    is_state_assignment: Mapped[bool] = mapped_column(Boolean, default=True, server_default=True)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=True, server_default=True)
    clinic_id: Mapped[int] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))
    laboratory_id: Mapped[int] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))

    work_type: Mapped["WorkType"] = relationship(back_populates="vetwork", lazy="joined")
    

    def __repr__(self) -> str:
        return f"{self.work_type.name}:{self.vetwork_date}"
