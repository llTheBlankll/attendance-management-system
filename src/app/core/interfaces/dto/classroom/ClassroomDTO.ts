import { Sex } from '../../../enums/Sex';
import { GradeLevel } from '../grade-level/GradeLevel';
import { Guardian } from '../guardian/Guardian';
import { Strand } from '../strand/Strand';
import { Student, StudentSchedule } from '../student/Student';

export interface ClassroomDTO {
  id?: number;
  room: string;
  schoolYear: string;
  classroomName: string;
  classroomPhoto?: string;
  teacher?: ClassroomTeacherDTO;
  gradeLevel: GradeLevel;
  students: ClassroomStudentDTO[];
}

export interface ClassroomStudentDTO {
  id?: number;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  prefix?: string;
  address?: string;
  sex?: Sex;
  birthdate: Date; // Assuming LocalDate will be represented as a string in TypeScript
  gradeLevel?: GradeLevel;
  strand?: Strand;
  guardian?: Guardian;
  studentSchedule?: StudentSchedule;
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
