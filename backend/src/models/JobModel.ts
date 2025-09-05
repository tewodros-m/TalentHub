import mongoose, { Schema } from 'mongoose';
import { IJob } from '../types/job';

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: [true, 'Job title is required'] },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    skills: { type: [String], default: [] },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Employer ID is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for applications count
jobSchema.virtual('applicationsCount', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'jobId',
  count: true, // only return the number of docs
});

export const Job = mongoose.model<IJob>('Job', jobSchema);
