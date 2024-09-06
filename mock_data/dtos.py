import datetime
from dataclasses import dataclass, asdict
from google.cloud.firestore_v1 import DocumentReference

@dataclass
class Guardian:
  fullName: str
  contactNumber: str

  def dict(self):
    return {k: str(v) for k, v in asdict(self).items()}


@dataclass
class Student:
  id: int
  firstName: str
  middleInitial: str
  lastName: str
  prefix: str
  address: str
  birthdate: datetime.date
  sex: str
  gradeLevel: DocumentReference
  guardian: DocumentReference
  classroom: DocumentReference

@dataclass
class Attendance:
  studentObj: Student
  student: DocumentReference
  status: str
  date: datetime.date
  timeIn: str
  timeOut: str
  notes: str