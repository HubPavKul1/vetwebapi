from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models.base import Base

if TYPE_CHECKING:
    from core.models import VetWork


class DiagnosticMethod(Base):
    """Вид работы"""

    __tablename__ = "diagnostic_methods"

    name: Mapped[str] = mapped_column(String(30))

    vetworks: Mapped[list["VetWork"]] = relationship(back_populates="diagnostic_method")

    def __repr__(self) -> str:
        return self.name
