import {GradeLevel} from '../grade-level/GradeLevel';
import {Student} from '../student/Student';

export interface ClassroomDTO {
  id?: number;
  room: string;
  schoolYear: string;
  classroomName: string;
  classroomPhoto?: string;
  teacher?: ClassroomTeacherDTO;
  gradeLevel: GradeLevel;
  students: Student[];
}

export interface ClassroomTeacherDTO {
  id: number;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  age: number;
  contactNumber?: string;
  emergencyContact: string;
  sex: string;
  position: string;
}
