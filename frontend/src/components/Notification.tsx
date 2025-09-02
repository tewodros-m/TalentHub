import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { clearNotifications } from '../features/notification/notificationSlice';

const Notification = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  return (
    <div className='absolute top-12 right-0 w-96 p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
          Job Applications
        </h2>
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
        <p className='text-gray-500 dark:text-gray-400'>
          No new applications yet.
        </p>
      ) : (
        <ul className='space-y-2'>
          {notifications
            .slice() // make a copy
            .reverse() // latest first
            .map((notif, idx) => (
              <li
                key={idx}
                className='p-3 bg-blue-100 text-gray-700 rounded shadow flex flex-col'
              >
                <span className='font-semibold text-gray-800 dark:text-gray-200'>
                  {notif.applicantName} applied
                </span>
                <span className='text-sm text-gray-700 dark:text-gray-300'>
                  for <strong>{notif.jobTitle}</strong>
                </span>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  Applicant ID: {notif.applicantId}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
