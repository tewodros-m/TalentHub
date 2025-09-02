import mongoose, { Schema } from 'mongoose';
import { INotification } from '../types/notification';

const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    message: { type: String, required: [true, 'Message is required'] },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>(
  'Notification',
  notificationSchema
);
