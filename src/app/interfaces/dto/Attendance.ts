import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {Timestamp} from "@angular/fire/firestore";

export interface Attendance {
  id: number;
  student: string;
  attendanceStatus: AttendanceStatus;
  date: Timestamp;
  timeIn: string;
  timeOut: string;
}
