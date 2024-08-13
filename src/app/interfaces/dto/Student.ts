import {Timestamp} from "@angular/fire/firestore";

export interface Student {
  id: number;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  prefix?: string;
  sex: string;
  birthdate: Timestamp;
  guardian: string; // ! Can cause circular reference
  section: string; // ! Can cause circular reference
  gradeLevel: string;
}
