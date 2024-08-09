import {Guardian} from "./Guardian";
import {Section} from "./Section";
import {GradeLevel} from "./GradeLevel";

export interface Student {
  id: number;
  firstName: string;
  middleInitial: string;
  lastName: string;
  prefix: string;
  sex: string;
  birthdate: string;
  guardian: string; // ! Can cause circular reference
  section: string; // ! Can cause circular reference
  gradeLevel: string;
}
