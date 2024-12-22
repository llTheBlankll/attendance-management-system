import {AttendanceStatus} from '../../enums/AttendanceStatus';
import {Student} from '../student/Student';

export interface Attendance {
  id: number;
  status: AttendanceStatus;
  date: Date;
  timeIn: Date;
  timeOut: Date;
  notes: string | null;
  student: Student;
}

export enum AttendanceForeignEntity {
  STUDENT = 'STUDENT',
  CLASSROOM = 'CLASSROOM'
}
