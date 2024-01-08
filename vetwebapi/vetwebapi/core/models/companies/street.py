from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .address import Address
    from .city import City


class Street(Base):
    """Класс Улица"""

    __tablename__ = "streets"

    city_id: Mapped[int] = mapped_column(ForeignKey("cities.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(250))

    city: Mapped["City"] = relationship(back_populates="streets", lazy="joined")
    addresses: Mapped[list["Address"]] = relationship(back_populates="street")

    def __repr__(self):
        return self.name
