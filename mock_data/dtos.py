import datetime
from dataclasses import dataclass
from google.cloud.firestore_v1 import DocumentReference

@dataclass
class Attendance:
  student: DocumentReference
  status: str
  date: datetime.date
  timeIn: str
  timeOut: str
  notes: str
