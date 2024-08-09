import {Student} from "./Student";
import {AttendanceStatus} from "../../enums/AttendanceStatus";

export interface Attendance {
  id: number;
  attendanceStatus: AttendanceStatus;
  date: Date;
  timeIn: Date;
  timeOut: Date;
  student: string;
}
