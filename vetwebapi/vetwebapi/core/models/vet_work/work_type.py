from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from vetwebapi.core.models import VetWork


class WorkType(Base):
    """Вид работы"""

    __tablename__ = "work_types"

    name: Mapped[str] = mapped_column(String(30))

    vetworks: Mapped[list["VetWork"]] = relationship(back_populates="work_type")

    def __repr__(self) -> str:
        return self.name