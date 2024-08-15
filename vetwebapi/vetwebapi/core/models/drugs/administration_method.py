from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from core.models.base import Base


class AdministrationMethod(Base):
    """Модель Способ применения препарата"""

    __tablename__ = "administration_methods"

    name: Mapped[str] = mapped_column(String(50))

    def __repr__(self) -> str:
        return self.name
