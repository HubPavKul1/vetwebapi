from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from vetwebapi.core.models.base import Base


class Region(Base):
    """Класс область"""

    __tablename__ = "regions"

    name: Mapped[str] = mapped_column(String(100))

    def __repr__(self):
        return self.name