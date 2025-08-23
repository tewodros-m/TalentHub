import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';
import { requestValidator } from '../middleware/requestValidator';
import { Role } from '../enums/role';

const router = Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('role')
      .optional()
      .isIn(Object.values(Role))
      .withMessage('Invalid role'),
  ],
  requestValidator,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  requestValidator,
  login
);
export default router;
