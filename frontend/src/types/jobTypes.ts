import type { User } from './userTypes';

export interface Job {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  createdAt: string;
  createdBy: User;
  applicationsCount?: number;
}

export interface JobResponse {
  results: number;
  jobs: Job[];
}

export type RegisterJob = {
  _id?: string; // optional, present when editing
  title: string;
  description: string;
  skills: string;
};
