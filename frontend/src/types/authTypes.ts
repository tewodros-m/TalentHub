export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  _id?: string;
}

export type Role = 'applicant' | 'employer' | 'admin';

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
