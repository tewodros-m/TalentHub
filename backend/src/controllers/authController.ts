import { Request, Response } from 'express';
import { User } from '../models/UserModel';
import { signToken } from '../utils/jwt';
import { asyncHandler } from '../utils/asyncHandler';

const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });

  const user = await User.create({ name, email, password, role });
  const token = signToken(user.id, user.role, user.name, user.email);

  res.status(201).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user)
    return res
      .status(401)
      .json({ message: 'Invalid email or password. Please try again.' });

  const ok = await user.comparePassword(password);
  if (!ok)
    return res
      .status(401)
      .json({ message: 'Invalid email or password. Please try again.' });

  const token = signToken(user.id, user.role, user.name, user.email);
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

export { register, login };
