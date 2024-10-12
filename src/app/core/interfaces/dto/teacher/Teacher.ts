import { AttendanceStatus } from '../../../enums/AttendanceStatus';

export interface Teacher {
  id?: number;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  teacherPhoto?: string;
  age: number;
  contactNumber?: string;
  emergencyContact: string;
  sex: string;
  position: string;
  user?: TeacherUserDTO;
}

interface TeacherUserDTO {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  role: AttendanceStatus;
  isExpired: boolean;
  isLocked: boolean;
  isEnabled: boolean;
  lastLogin: Date;
}
