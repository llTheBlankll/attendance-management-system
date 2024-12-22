export interface AddTeacherDTO {
  firstName: string;
  lastName: string;
  middleInitial: string;
  sex: string;
  age: number;
  position: string;
  emergencyContact: string;
  contactNumber: string;
  pfp: File | null;
}
