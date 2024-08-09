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
  guardian: Guardian; // ! Can cause circular reference
  section: Section; // ! Can cause circular reference
  gradeLevel: GradeLevel;
}
