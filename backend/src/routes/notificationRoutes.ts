import { Router } from 'express';
import { protect } from '../middlewares/protect';
import {
  getEmployerNotifications,
  markNotificationRead,
} from '../controllers/notificationController';
import { requireRole } from '../middlewares/requireRole';
import { Role } from '../enums/role';

const router = Router();

router.use(protect, requireRole(Role.employer));

router.get('/employer/:employerId', getEmployerNotifications);
router.patch('/:id/read', markNotificationRead);

export default router;
