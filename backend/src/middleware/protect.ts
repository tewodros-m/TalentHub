import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Unauthorized, you are not logged in.' });
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as any;
    req.user = { id: payload.id, role: payload.role } as any;
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ message: 'Invalid token, please log in again.' });
  }
};
