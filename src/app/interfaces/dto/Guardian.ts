import {Student} from "./Student";

export interface Guardian {
  id: number;
  fullName: string;
  contactNumber: string;
  student?: Student; // ! Can cause circular reference
}
