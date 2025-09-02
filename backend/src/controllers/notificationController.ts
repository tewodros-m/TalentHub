import { Request, Response } from 'express';
import { Notification } from '../models/NotificationModel';
import { asyncHandler } from '../utils/asyncHandler';

const getNotifications = asyncHandler(async (req: Request, res: Response) => {
  const notifications = await Notification.find({ user: req.user!.id }).sort({
    createdAt: -1,
  });
  res.status(200).json({ results: notifications.length, notifications });
});

const markNotificationRead = asyncHandler(
  async (req: Request, res: Response) => {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    await Notification.updateOne({ _id: req.params.id }, { read: true });
    res.status(200).json({ success: true });
  }
);

export { getNotifications, markNotificationRead };
