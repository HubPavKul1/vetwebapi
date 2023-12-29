from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .city import City
    from .company import Company
    from .district import District
    from .region import Region
    from .street import Street


class Address(Base):
    """Класс Адрес"""

    __tablename__ = "addresses"

    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))
    region_id: Mapped[int] = mapped_column(ForeignKey("regions.id", ondelete="CASCADE"))
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id", ondelete="CASCADE"))
    city_id: Mapped[int] = mapped_column(ForeignKey("cities.id", ondelete="CASCADE"))
    street_id: Mapped[int] = mapped_column(ForeignKey("streets.id", ondelete="CASCADE"))
    house_number: Mapped[str] = mapped_column(String(5))
    phone_number1: Mapped[str]
    phone_number2: Mapped[str | None]

    company: Mapped["Company"] = relationship(back_populates="addresses")
    region: Mapped["Region"] = relationship(back_populates="addresses")
    district: Mapped["District"] = relationship(back_populates="addresses")
    city: Mapped["City"] = relationship(back_populates="addresses")
    street: Mapped["Street"] = relationship(back_populates="addresses")

    def __repr__(self) -> str:
        return f"{self.city.name}, {self.street.name}, {self.house_number}"
