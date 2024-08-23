import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {Timestamp} from "@angular/fire/firestore";
import {DocumentReference} from "@angular/fire/compat/firestore";

export interface Attendance {
  id: string;
  student: DocumentReference;
  attendanceStatus: AttendanceStatus;
  date: Timestamp;
  timeIn: string;
  timeOut: string;
}
