export interface Guardian {
  id: number;
  fullName: string;
  contactNumber: string;
  student?: string; // ! Can cause circular reference
}
