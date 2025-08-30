import type { ApplicationWithObjects } from '../../types/applicationTypes';
import { formatDate } from '../../utils/formateDate';

interface ApplicationCardProps {
  application: ApplicationWithObjects;
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const { jobId, createdAt, status } = application;

  return (
    <div
      className={`p-5 border  rounded-2xl bg-bg shadow-sm hover:shadow-lg ${
        status === 'shortlisted'
          ? 'border-secondary-500 '
          : status === 'rejected'
          ? 'border-red-500 '
          : 'border-primary-200 '
      }`}
    >
      {/* Job Title */}
      <h3 className='text-lg font-semibold text-gray-700'>{jobId.title}</h3>

      {/* Meta Info */}
      <p className='text-sm text-gray-500 mt-1'>
        Submitted on{' '}
        <span className='font-medium text-gray-700 '>
          {formatDate(createdAt)}
        </span>
      </p>

      {/* Status Badge */}
      <span
        className={`inline-block mt-4 px-3 py-1 text-xs font-medium rounded-full tracking-wide
          ${
            status === 'shortlisted'
              ? 'bg-secondary-100 text-secondary-800 '
              : status === 'rejected'
              ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
              : 'bg-primary-100 dark:bg-primary-200 text-primary-800'
          }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

export default ApplicationCard;
