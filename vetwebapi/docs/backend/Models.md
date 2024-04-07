## Модели проекта
### models/companies/
```python
# models/companies/address.py

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .region import Region
    from .district import District
    from .city import City
    from .company import Company
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

```
```python
# models/companies/city.py

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
```
```python

# models/companies/company.py

from typing import TYPE_CHECKING

from slugify import slugify
from sqlalchemy import Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .address import Address
    from .employee import Employee


class Company(Base):
    """класс Компания"""

    __tablename__ = "companies"

    full_name: Mapped[str]
    short_name: Mapped[str]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    addresses: Mapped["Address"] = relationship(back_populates="company")
    employees: Mapped[list["Employee"]] = relationship(back_populates="company")

    @property
    def company_slug(self):
        return slugify(self.short_name)

    def __repr__(self) -> str:
        return self.short_name
```

```python

# models/companies/district.py

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
```

```python

# models/companies/employee.py

from typing import TYPE_CHECKING

from slugify import slugify
from sqlalchemy import Boolean, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base
from vetwebapi.utils import utils

if TYPE_CHECKING:
    from .company import Company
    from .position import Position


class Employee(Base):
    """Класс Работник"""

    __tablename__ = "employees"
    
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))
    position_id: Mapped[int] = mapped_column(ForeignKey("positions.id", ondelete="CASCADE"))
    lastname: Mapped[str] = mapped_column(String(50))
    firstname: Mapped[str] = mapped_column(String(30))
    patronymic: Mapped[str] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    
    company: Mapped["Company"] = relationship(back_populates="employees")
    position: Mapped["Position"] = relationship(back_populates="employees")
    
    @property
    def fullname(self):
        return utils.get_full_name(lastname=self.lastname, firstname=self.firstname, patronymic=self.patronymic,)
    
    @property
    def employee_slug(self):
        return slugify(utils.get_full_name(lastname=self.lastname, firstname=self.firstname, patronymic=self.patronymic,))
```

```python
# models/companies/position.py 


from typing import TYPE_CHECKING
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .employee import Employee


class Position(Base):
    """Класс Должность"""

    __tablename__ = "positions"

    name: Mapped[str] = mapped_column(String(100))

    employees: Mapped[list["Employee"]] = relationship(back_populates="position")

    def __repr__(self):
        return self.name
```

```python

# models/companies/region.py

from typing import TYPE_CHECKING
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .district import District
    from .address import Address

class Region(Base):
    """Класс область"""

    __tablename__ = "regions"

    name: Mapped[str] = mapped_column(String(100))

    districts: Mapped[list["District"]] = relationship(back_populates="region")
    addresses: Mapped[list["Address"]] = relationship(back_populates="region")

    def __repr__(self):
        return self.name

```
```python

# models/companies/street.py 

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from vetwebapi.core.models.base import Base

if TYPE_CHECKING:
    from .city import City
    from .address import Address


class Street(Base):
    """Класс улица"""

    __tablename__ = "streets"

    city_id: Mapped[int] = mapped_column(ForeignKey("cities.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(250))

    city: Mapped["City"] = relationship(back_populates="streets")
    addresses: Mapped[list["Address"]] = relationship(back_populates="street")

    def __repr__(self):
        return self.name
```


```python
# Файл core/models/__init__.py


__all__ = ("Base", "Address", "City", "Company", "Employee", "Position", "Street", "Region", "District",)

from .base import Base
from .companies.address import Address
from .companies.city import City
from .companies.company import Company
from .companies.employee import Employee
from .companies.position import Position
from .companies.street import Street
from .companies.region import Region
from .companies.district import District
```
$ alembic revision --autogenerate -m 'initial'

Предварительно запустить базу данных!!!