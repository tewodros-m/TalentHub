import type { Role, User } from './userTypes';

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
