import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Application } from '../models/ApplicationModel';
import { ApplicationStatus } from '../enums/applicationStatus';

// List all applications with job & user populated
export const listAllApplications = asyncHandler(
  async (_req: Request, res: Response) => {
    const apps = await Application.find()
      .populate('jobId', 'title description')
      .populate('userId', 'name email role');
    res.json(apps);
  }
);

// Update application status
export const updateApplicationStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body; // must be applied | shortlisted | rejected

    if (!Object.values(ApplicationStatus).includes(status)) {
      res.status(400);
      throw new Error('Invalid status');
    }

    const app = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('jobId userId');
    if (!app) {
      res.status(404);
      throw new Error('Application not found');
    }

    res.json(app);
  }
);

// Analytics: number of applications per job
export const applicationsPerJob = asyncHandler(
  async (_req: Request, res: Response) => {
    const stats = await Application.aggregate([
      { $group: { _id: '$jobId', count: { $sum: 1 } } },
      {
        $lookup: {
          from: 'jobs',
          localField: '_id',
          foreignField: '_id',
          as: 'job',
        },
      },
      { $unwind: '$job' },
      {
        $project: {
          jobId: '$_id',
          title: '$job.title',
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.json(stats);
  }
);
