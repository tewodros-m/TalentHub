import mongoose, { Schema } from 'mongoose';
import { IApplication } from '../types/application';
import { ApplicationStatus } from '../enums/applicationStatus';

const applicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'JobId is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserId is required'],
    },
    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.applied,
    },
    resumeUrl: { type: String, required: [true, 'Resume is required'] },
  },
  { timestamps: true }
);

// Prevent duplicate applications
applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

export const Application = mongoose.model<IApplication>(
  'Application',
  applicationSchema
);
