import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, env.JWT_SECRET as jwt.Secret, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};
