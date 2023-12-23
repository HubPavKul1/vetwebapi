from typing import TYPE_CHECKING

from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .district import District
    from .street import Street
    from .address import Address


class City(Base):
    """Класс Город"""

    __tablename__ = "cities"

    district_id = mapped_column(ForeignKey("districts.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(100))

    district: Mapped["District"] = relationship(back_populates="cities")
    streets: Mapped[list["Street"]] = relationship(back_populates="city")
    addresses: Mapped[list["Address"]] = relationship(back_populates="city")

    def __repr__(self):
        return self.name
