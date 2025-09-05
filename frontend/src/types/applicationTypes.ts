import type { Job } from './jobTypes';
import type { User } from './userTypes';

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
