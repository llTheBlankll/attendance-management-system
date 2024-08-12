import {AttendanceStatus} from "../../enums/AttendanceStatus";
import {Timestamp} from "@angular/fire/firestore";

export interface Attendance {
  id: number;
  attendanceStatus: AttendanceStatus;
  date: Timestamp;
  timeIn: string;
  timeOut: string;
  student: string;
}
