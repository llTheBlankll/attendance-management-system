import {GradeLevel} from '../grade-level/GradeLevel';
import {Student} from '../student/Student';

export interface Classroom {
  id: number;
  room: string;
  classroomName: string;
  classroomPhoto?: string;
  description?: string;
  teacher?: ClassroomTeacherDTO;
  gradeLevel: GradeLevel;
  students: Student[];
}

interface ClassroomTeacherDTO {
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
