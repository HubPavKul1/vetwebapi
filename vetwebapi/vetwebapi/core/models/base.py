from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from typing import Annotated

intpk = Annotated[int, mapped_column(primary_key=True)]


class BaseNoPk(DeclarativeBase):
    _abstract_ = True


class Base(BaseNoPk):
    __abstract__ = True

    id: Mapped[intpk] 


