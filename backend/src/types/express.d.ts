import { JwtPayload } from 'jsonwebtoken';
import { Role } from './role';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
      } & JwtPayload;
    }
  }
}
