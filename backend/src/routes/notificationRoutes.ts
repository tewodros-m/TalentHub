import { Router } from 'express';
import { protect } from '../middlewares/protect';
import {
  getNotifications,
  markNotificationRead,
} from '../controllers/notificationController';
import { requireRole } from '../middlewares/requireRole';
import { Role } from '../enums/role';

const router = Router();

router.use(protect, requireRole(Role.employer));

router.get('/', getNotifications);
router.patch('/:id/read', markNotificationRead);

export default router;
