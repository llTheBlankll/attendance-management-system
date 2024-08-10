import datetime
from dataclasses import dataclass


@dataclass
class Attendance:
    student: int
    status: str
    date: datetime.date
    timeIn: str
    timeOut: str
    notes: str