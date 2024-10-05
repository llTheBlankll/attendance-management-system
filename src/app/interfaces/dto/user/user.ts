export interface User {
  username: string;
  email: string;
  profilePicture?: string;
  role: string;
  isExpired: boolean;
  isLocked: boolean;
  isEnabled: boolean;
  lastLogin?: Date;
  teacher?: UserTeacherDTO;
}

interface UserTeacherDTO {
  id: number;
  firstName: string;
  lastName: string;
  middleInitial: string;
  age: number;
  contactNumber: string;
  emergencyContact: string;
  sex: string;
  position: string;
}
