import mongoose, { Document } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  message: string;
  read: boolean;
  createdAt: Date;
}
