import { Document } from 'mongoose';
import { Role } from './role';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  comparePassword(candidate: string): Promise<boolean>;
}
