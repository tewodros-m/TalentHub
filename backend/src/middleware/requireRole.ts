import { Request, Response, NextFunction } from 'express';
import { Role } from '../types/role';

export const requireRole = (...roles: Array<Role>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({
        message: 'Forbidden, you do not have permission for this resource',
      });
    }
    next();
  };
};
