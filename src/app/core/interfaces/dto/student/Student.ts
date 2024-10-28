import { Sex } from '../../../enums/Sex';
import { GradeLevel } from '../grade-level/GradeLevel';
import { Strand } from '../strand/Strand';
import { Teacher } from '../teacher/Teacher';

// Define the missing interfaces
interface StudentClassroom {
  id: number;
  room: string;
  classroomName: string;
  teacher: Teacher;
  gradeLevel: GradeLevel;
}

interface StudentGuardian {
  id: number;
  fullName: string;
  contactNumber?: string;
}

export interface StudentSchedule {
  id: number;
  onTime: Date;
  lateTime: Date;
  absentTime: Date;
  isFlag: boolean;
}

export interface Student {
  id: number;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  profilePicture?: string;
  prefix?: string;
  address?: string;
  sex: Sex;
  birthdate: Date;
  classroom?: StudentClassroom;
  gradeLevel?: GradeLevel;
  strand?: Strand;
  guardian?: StudentGuardian;
  studentSchedule?: StudentSchedule;
}
