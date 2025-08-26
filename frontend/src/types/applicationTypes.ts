import type { User } from './authTypes';
import type { Job } from './jobTypes';

export type ApplicationStatus = 'applied' | 'shortlisted' | 'rejected';

export interface Application {
  _id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  resumeUrl: string;
  createdAt: string;
}

export type ApplicationWithObjects = Omit<Application, 'jobId' | 'userId'> & {
  jobId: Job;
  userId?: User;
};

export type GetApplicationsResponse = {
  results: number;
  applications: ApplicationWithObjects[];
};
