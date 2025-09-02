import { JwtPayload } from 'jsonwebtoken';
import { Server } from 'socket.io';
import { Role } from '../enums/role';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
        name: string;
        email: string;
      } & JwtPayload;
      io: Server;
    }
  }
}
