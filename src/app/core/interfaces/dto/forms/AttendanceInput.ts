import { Student } from "../student/Student";

export interface AttendanceInput {
  student: Student;
  status: string;
  date: string;
  timeIn: string;
  timeOut: string;
  notes: string;
}
