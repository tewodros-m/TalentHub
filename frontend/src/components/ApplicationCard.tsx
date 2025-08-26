import type { ApplicationWithObjects } from '../types/applicationTypes';
import { formatDate } from '../utils/formateDate';

interface ApplicationCardProps {
  application: ApplicationWithObjects;
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const { jobId, createdAt, status } = application;

  return (
    <div
      className={`p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition ${
        status === 'shortlisted' ? 'border-secondary-500 ' : ' '
      }`}
    >
      {/* Job Title */}
      <h3 className='text-lg font-semibold text-gray-900'>{jobId.title}</h3>

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
            status === 'applied'
              ? 'bg-blue-100 text-blue-700 '
              : status === 'shortlisted'
              ? 'bg-secondary-100 text-secondary-700 '
              : 'bg-primary-100 text-red-700 '
          }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

export default ApplicationCard;
