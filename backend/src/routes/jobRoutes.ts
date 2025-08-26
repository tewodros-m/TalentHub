import { Router } from 'express';
import { body } from 'express-validator';
import {
  listJobs,
  getJobById,
  createJob,
  deleteJob,
  updateJob,
  listEmployerJobs,
} from '../controllers/jobController';
import { protect } from '../middleware/protect';
import { requireRole } from '../middleware/requireRole';
import { requestValidator } from '../middleware/requestValidator';
import { Role } from '../enums/role';

const router = Router();

// Public - anyone can view jobs
router.get('/', listJobs);
router.get('/:id', getJobById);

router.use(protect, requireRole(Role.employer));

router.get('/employer', listEmployerJobs);

// only employer can create job
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Job title is required'),
    body('description').notEmpty().withMessage('Job description is required'),
    body('skills')
      .optional()
      .isArray()
      .withMessage('Skills must be an array of strings'),
  ],
  requestValidator,
  createJob
);

// only employer can update job
router.patch(
  '/:id',
  [
    body('title')
      .optional()
      .notEmpty()
      .withMessage('Job title cannot be empty'),
    body('description')
      .optional()
      .notEmpty()
      .withMessage('Job description cannot be empty'),
    body('skills')
      .optional()
      .isArray()
      .withMessage('Skills must be an array of strings'),
  ],
  requestValidator,
  updateJob
);

// only employer can delete job
router.delete('/:id', deleteJob);

export default router;
