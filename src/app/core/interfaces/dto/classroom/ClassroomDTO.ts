import { Sex } from '../../../enums/Sex';
import { GradeLevel } from '../grade-level/GradeLevel';
import { Student } from '../student/Student';

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
  birthdate: string; // Assuming LocalDate will be represented as a string in TypeScript
  gradeLevel?: GradeLevelDTO;
  strand?: StrandDTO;
  guardian?: StudentGuardianDTO;
  studentSchedule?: StudentScheduleDTO;
}

// Interfaces for related DTOs
export interface GradeLevelDTO {
  // Add properties as needed
}

export interface StrandDTO {
  // Add properties as needed
}

export interface StudentGuardianDTO {
  // Add properties as needed
}

export interface StudentScheduleDTO {
  // Add properties as needed
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
