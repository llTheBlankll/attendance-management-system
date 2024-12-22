import {User} from "../user/user";

export interface Announcement {
  id?: number;
  title: string;
  content: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
