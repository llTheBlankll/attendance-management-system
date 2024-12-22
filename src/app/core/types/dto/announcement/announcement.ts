import {User} from "../user/user";

export interface AnnouncementResponse {
  id?: number;
  title: string;
  content: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id?: number;
  title: string;
  content: string;
  user: User;
  createdAt?: Date;
  updatedAt?: Date;
}
