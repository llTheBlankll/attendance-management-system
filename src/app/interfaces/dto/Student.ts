import {Timestamp} from "@angular/fire/firestore";
import {Sex} from "../../enums/Sex";

export interface Student {
  id: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  prefix?: string;
  sex: Sex;
  birthdate: Timestamp;
  strand?: any;
  guardian?: any; // ! Can cause circular reference
  classroom?: any; // ! Can cause circular reference
  gradeLevel?: any;
}
