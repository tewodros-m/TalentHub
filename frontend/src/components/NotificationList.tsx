import { useDispatch } from 'react-redux';
import { clearNotifications } from '../features/notification/notificationSlice';
import { useMarkNotificationReadMutation } from '../features/notification/notificationApi';
import { useNotification } from '../hooks/useNotification';

const NotificationList = () => {
  const { notifications } = useNotification();
  const dispatch = useDispatch();

  const [markRead] = useMarkNotificationReadMutation();

  return (
    <div className='flex flex-col border border-primary-100 p-4 w-96 max-w-md mx-auto bg-bg max-h-96 overflow-y-auto rounded-lg shadow-lg'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-medium text-gray-700'>Job Applications</h2>
        {notifications.length > 0 && (
          <button
            className='text-sm text-red-500 hover:underline font-medium'
            onClick={() => dispatch(clearNotifications())}
          >
            Clear
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className='flex flex-1 items-center justify-center h-full'>
          <p className='text-gray-500 text-center'>No new applications yet.</p>
        </div>
      ) : (
        <ul className='space-y-2 p-4 bg-bg text-gray-600'>
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className={`flex items-start gap-3 border-b border-primary-200 py-3 ${
                notif.read ? 'opacity-50' : ''
              }`}
            >
              <span className='flex-shrink-0 w-2 h-2 rounded-full bg-primary-600 mt-2' />

              <div className='flex-1 items-center'>
                <span className='text-gray-700 font-normal'>
                  {notif.message}
                </span>
                {!notif.read && (
                  <button
                    className='ml-2 text-primary-500 font-medium hover:underline'
                    onClick={() => markRead(notif._id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
