import {Student} from "./Student";
import {Teacher} from "./Teacher";
import {Strand} from "./Strand";
import {GradeLevel} from "./GradeLevel";

export interface Section {
  id: number;
  room: string;
  sectionName: string;
  strand: Strand;
  gradeLevel: GradeLevel;
  teacher: Teacher;
  students?: Student[]; // ! Can cause circular reference
}
