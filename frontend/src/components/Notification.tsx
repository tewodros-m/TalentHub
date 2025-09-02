import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { clearNotifications } from '../features/notification/notificationSlice';

const Notification = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col border border-primary-100 w-96 p-4 max-w-md mx-auto bg-bg h-96 overflow-y-auto rounded-lg shadow-lg'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-medium text-gray-700'>Job Applications</h2>
        {notifications.length > 0 && (
          <button
            className='text-sm text-red-500 hover:underline'
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
        <ul className='space-y-2'>
          {notifications
            .slice() // make a copy
            .reverse() // latest first
            .map((notif, idx) => (
              <li key={idx} className='flex items-center gap-2'>
                <span className='inline-block w-2 h-2 rounded-full bg-primary-500 relative -top-1 '></span>
                <span className='text-gray-500 font-normal mb-2'>
                  {notif.applicantName} applied for
                  {notif.jobTitle}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
