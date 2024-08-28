import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {Timestamp} from "@angular/fire/firestore";
import {DocumentReference} from "@angular/fire/compat/firestore";
import {Class} from "./Class";
import {Student} from "./Student";

export interface Attendance {
  id: string;
  studentObj: Student;
  student: DocumentReference;
  class: Class;
  status: AttendanceStatus;
  date: Timestamp;
  timeIn: string;
  timeOut: string;
}
