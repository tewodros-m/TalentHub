export interface Notification {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  results: number;
  notifications: Notification[];
}
