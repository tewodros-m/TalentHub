import { Router } from 'express';
import { protect } from '../middlewares/protect';
import { requireRole } from '../middlewares/requireRole';
import { Role } from '../enums/role';
import { getAllUsers } from '../controllers/userController';

const router = Router();

router.use(protect);

router.get('/', requireRole(Role.admin), getAllUsers);

export default router;
