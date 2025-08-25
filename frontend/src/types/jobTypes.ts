import type { User } from './authTypes';

export interface Job {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  createdAt: string;
  createdBy: User;
}
