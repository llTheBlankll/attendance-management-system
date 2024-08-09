import {Student} from "./Student";
import {GradeLevel} from "./GradeLevel";
import {Strand} from "./Strand";
import {Teacher} from "./Teacher";

export interface Section {
  id: number;
  room: string;
  sectionName: string;
  strand: Strand;
  gradeLevel: GradeLevel;
  teacher: Teacher;
  students?: Student[]; // ! Can cause circular reference
}
