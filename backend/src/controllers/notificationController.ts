import { Request, Response } from 'express';
import { Notification } from '../models/NotificationModel';
import { asyncHandler } from '../utils/asyncHandler';

const getEmployerNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    const { employerId } = req.params;
    if (employerId !== req.user!.id) {
      res.status(403);
      throw new Error('Forbidden, you can only view your own notifications');
    }
    const notifications = await Notification.find({ user: employerId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ results: notifications.length, notifications });
  }
);

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

export { getEmployerNotifications, markNotificationRead };
