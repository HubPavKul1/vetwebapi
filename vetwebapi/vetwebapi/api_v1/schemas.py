from datetime import date

from pydantic import BaseModel


class DateRangeIn(BaseModel):
    date_start: date
    date_end: date


class SuccessMessage(BaseModel):
    result: bool = True
