export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  _id?: string;
  createdAt: string;
  updatedAt: string;
}

export type Role = 'applicant' | 'employer' | 'admin';

export type UsersResponse = {
  results: number;
  users: User[];
};
