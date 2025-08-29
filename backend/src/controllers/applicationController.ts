import { Request, Response } from 'express';
import streamifier from 'streamifier';
import path from 'path';
import { asyncHandler } from '../utils/asyncHandler';
import { Application } from '../models/ApplicationModel';
import { Job } from '../models/JobModel';
import { cloudinary } from '../config/cloudinary';

// Apply to a job with resume upload
const applyToJob = asyncHandler(async (req: Request, res: Response) => {
  const { jobId } = req.body;

  const job = await Job.findById(jobId);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  let resumeUrl: string | undefined;
  let resumeFileName: string | undefined;

  if (req.file) {
    try {
      // filename without extension
      const originalName = path
        .parse(req.file.originalname)
        .name.replace(/\s+/g, '_');
      // .pdf, .docx, etc.
      const extension = path.extname(req.file.originalname);

      // Append timestamp to filename
      const timestamp = Date.now();
      resumeFileName = `${originalName}_${timestamp}${extension}`;

      const upload = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'resumes',
            public_id: resumeFileName,
            overwrite: true,
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file!.buffer).pipe(stream);
      });

      // PDFs may not have secure_url, so fall back to url
      resumeUrl = upload.secure_url || upload.url;

      if (!resumeUrl) {
        res.status(500);
        throw new Error('Failed to upload resume to Cloudinary');
      }
    } catch (err) {
      res.status(500);
      throw new Error('Resume upload failed');
    }
  } else {
    console.log('req.file', req.file);
    res.status(400);
    throw new Error('Resume file is required');
  }

  try {
    const application = await Application.create({
      jobId,
      userId: req.user!.id,
      resumeUrl,
      resumeFileName,
    });
    res.status(201).json(application);
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(409);
      throw new Error('You already applied to this job');
    }
    throw err;
  }
});

// Get applications for a specific user (self or admin)
const getUserApplications = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const requester = req.user!;

    if (requester.role !== 'admin' && requester.id !== userId) {
      res.status(403);
      throw new Error('Forbidden, you cannot view applications of other users');
    }

    const apps = await Application.find({ userId })
      .populate('jobId')
      .sort({ createdAt: -1 });
    res.json({ results: apps.length, applications: apps });
  }
);

export { applyToJob, getUserApplications };
