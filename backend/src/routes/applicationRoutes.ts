import { Router } from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import {
  applyToJob,
  getAllApplications,
  getEmployerApplications,
  getUserApplications,
  updateApplicationStatusByEmployer,
} from '../controllers/applicationController';
import { protect } from '../middlewares/protect';
import { requireRole } from '../middlewares/requireRole';
import { requestValidator } from '../middlewares/requestValidator';
import { Role } from '../enums/role';

const router = Router();

router.use(protect);

// Store file in memory for cloud upload
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', requireRole(Role.admin), getAllApplications);

router.post(
  '/',
  requireRole(Role.applicant),
  upload.single('resume'),
  [body('jobId').notEmpty().withMessage('JobId is required')],
  requestValidator,
  applyToJob
);
router.get('/:userId', requireRole(Role.applicant), getUserApplications);

router.get(
  '/employer/:employerId',
  requireRole(Role.employer),
  getEmployerApplications
);
router.patch(
  '/:id',
  requireRole(Role.employer),
  updateApplicationStatusByEmployer
);

export default router;
