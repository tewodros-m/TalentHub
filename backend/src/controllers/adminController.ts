import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Application } from '../models/ApplicationModel';
import { ApplicationStatus } from '../enums/applicationStatus';
import { Job } from '../models/JobModel';

// List all jobs with user populated
const listAllJobs = asyncHandler(async (_req: Request, res: Response) => {
  // Aggregate applications per job
  const counts = await Application.aggregate([
    { $group: { _id: '$jobId', count: { $sum: 1 } } },
  ]);

  // Convert to lookup object: { jobId: count }
  const countsMap: Record<string, number> = {};
  counts.forEach((c) => {
    countsMap[c._id.toString()] = c.count;
  });

  // Fetch jobs and append applicationsCount
  const jobs = await Job.find().sort({ createdAt: -1 }).lean();
  const jobsWithCounts = jobs.map((job) => ({
    ...job,
    applicationsCount: countsMap[job._id.toString()] || 0,
  }));

  res
    .status(200)
    .json({ results: jobsWithCounts.length, jobs: jobsWithCounts });
});

// List all applications with job & user populated
const listAllApplications = asyncHandler(
  async (_req: Request, res: Response) => {
    const applications = await Application.find()
      .populate('jobId', 'title description')
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 });
    res.status(200).json({ results: applications.length, applications });
  }
);

// Update application status
const updateApplicationStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body; // must be applied | shortlisted | rejected

    if (!Object.values(ApplicationStatus).includes(status)) {
      res.status(400);
      throw new Error('Invalid status');
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('jobId userId');
    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }

    res.status(200).json(application);
  }
);

// Analytics: number of applications per job
const applicationsPerJob = asyncHandler(
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
    res.status(200).json(stats);
  }
);

export {
  listAllJobs,
  listAllApplications,
  updateApplicationStatus,
  applicationsPerJob,
};
