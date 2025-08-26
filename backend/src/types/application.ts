import { Document, Types } from 'mongoose';
import { ApplicationStatus } from '../enums/applicationStatus';

export interface IApplication extends Document {
  jobId: Types.ObjectId;
  userId: Types.ObjectId;
  status: ApplicationStatus;
  resumeUrl: string;
}
