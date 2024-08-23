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
  guardian?: any; // ! Can cause circular reference
  class?: any; // ! Can cause circular reference
  gradeLevel?: any;
}
