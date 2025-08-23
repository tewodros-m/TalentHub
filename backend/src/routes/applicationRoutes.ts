import { Router } from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import {
  applyToJob,
  getUserApplications,
} from '../controllers/applicationController';
import { protect } from '../middleware/protect';
import { requireRole } from '../middleware/requireRole';
import { requestValidator } from '../middleware/requestValidator';
import { Role } from '../enums/role';

const router = Router();

// Store file in memory for cloud upload
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/',
  protect,
  requireRole(Role.applicant),
  upload.single('resume'),
  [body('jobId').notEmpty().withMessage('JobId is required')],
  requestValidator,
  applyToJob
);

router.get('/:userId', protect, getUserApplications);

export default router;
