import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Job } from '../models/JobModel';

// Public: List all jobs
const getAllJobs = asyncHandler(async (req: Request, res: Response) => {
  const { search } = req.query;

  const filter = search
    ? {
        $or: [
          { title: { $regex: String(search), $options: 'i' } },
          { description: { $regex: String(search), $options: 'i' } },
          { skills: { $in: [new RegExp(String(search), 'i')] } },
        ],
      }
    : {};

  const jobs = await Job.find(filter)
    .sort({ createdAt: -1 })
    .populate('createdBy', 'name email role');

  res.status(200).json({ results: jobs.length, jobs });
});

const getJobById = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id).populate(
    'createdBy',
    'name email role'
  );
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  res.status(200).json(job);
});

// Get all jobs created by the logged-in employer
const getEmployerJobs = asyncHandler(async (req: Request, res: Response) => {
  const { employerId } = req.params;
  if (req.user!.id !== employerId) {
    return res.status(403).json({
      message: 'Forbidden, you do not have permission to view these jobs',
    });
  }
  const jobs = await Job.find({ createdBy: employerId })
    .sort({ createdAt: -1 })
    .populate('createdBy', 'name email role');

  res.status(200).json({ results: jobs.length, jobs });
});

// Create a job (employer only)
const createJob = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, skills } = req.body;
  const job = await Job.create({
    title,
    description,
    skills,
    createdBy: req.user!.id,
  });
  res.status(201).json(job);
});

// Update Job (Employer only)
const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, skills } = req.body;

  const job = await Job.findById(id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  const isOwner = job.createdBy.toString() === req.user!.id;
  if (!isOwner) {
    return res.status(403).json({
      message: 'Forbidden, you do not have permission to update this job',
    });
  }

  job.title = title ?? job.title;
  job.description = description ?? job.description;
  job.skills = skills ?? job.skills;

  await job.save();
  res.status(200).json(job);
});

// Delete own job (employer only)
const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  // Only employer who created can delete
  const isOwner = job.createdBy.toString() === req.user!.id;

  if (!isOwner) {
    res.status(403);
    throw new Error('Forbidden, you do not have permission to delete this job');
  }

  await job.deleteOne();
  res.status(200).json({ message: 'Job deleted successfully' });
});

export {
  getAllJobs,
  getJobById,
  getEmployerJobs,
  createJob,
  deleteJob,
  updateJob,
};
