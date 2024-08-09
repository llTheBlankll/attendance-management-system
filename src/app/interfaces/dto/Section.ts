import {Student} from "./Student";
import {GradeLevel} from "./GradeLevel";
import {Strand} from "./Strand";
import {Teacher} from "./Teacher";

export interface Section {
  id: number;
  room: string;
  sectionName: string;
  strand: string;
  gradeLevel: string;
  teacher: string;
  students?: string[]; // ! Can cause circular reference
}
