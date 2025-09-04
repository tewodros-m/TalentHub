import { Router } from 'express';
import { body } from 'express-validator';
import {
  listAllJobs,
  listAllApplications,
  updateApplicationStatus,
  applicationsPerJob,
} from '../controllers/adminController';
import { protect } from '../middlewares/protect';
import { requireRole } from '../middlewares/requireRole';
import { requestValidator } from '../middlewares/requestValidator';
import { Role } from '../enums/role';

const router = Router();

// All routes below require admin
router.use(protect, requireRole(Role.admin));

router.get('/jobs', listAllJobs);

// GET all applications
router.get('/applications', listAllApplications);

// Update application status
router.patch(
  '/applications/:id',
  [body('status').notEmpty().withMessage('Status is required')],
  requestValidator,
  updateApplicationStatus
);

// Applications per job analytics
router.get('/analytics/applications-per-job', applicationsPerJob);

export default router;
