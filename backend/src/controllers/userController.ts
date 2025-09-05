import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { User } from '../models/UserModel';

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.status(200).json({ results: users.length, users });
});

export { getAllUsers };
