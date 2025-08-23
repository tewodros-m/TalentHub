import { Document, Types } from 'mongoose';

export interface IApplication extends Document {
  jobId: Types.ObjectId;
  userId: Types.ObjectId;
  status: 'applied' | 'shortlisted' | 'rejected';
  resumeUrl?: string;
}
