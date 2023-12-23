from typing import TYPE_CHECKING

from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .region import Region
    from .city import City
    from .address import Address


class District(Base):
    """Класс Район"""

    __tablename__ = "districts"

    region_id: Mapped[int] = mapped_column(ForeignKey("regions.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(100))

    region: Mapped["Region"] = relationship(back_populates="districts")
    cities: Mapped[list["City"]] = relationship(back_populates="district")
    addresses: Mapped[list["Address"]] = relationship(back_populates="district")

    def __repr__(self):
        return self.name
