import { Student } from "../student/Student";

export interface Guardian {
  id: number;
  fullName: string;
  contactNumber: string;
  students: Student[];
}
