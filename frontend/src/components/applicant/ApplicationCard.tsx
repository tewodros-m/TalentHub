import { type ApplicationWithObjects } from '../../types/applicationTypes';
import { FileText, Calendar, Briefcase } from 'lucide-react';
import { formatDate } from '../../utils/formateDate';

interface Props {
  application: ApplicationWithObjects;
}

const statusColors: Record<string, string> = {
  applied:
    'bg-primary-100 dark:bg-primary-200 text-primary-800 border-primary-300',
  shortlisted: 'bg-secondary-100 text-secondary-800 border-green-300',
  rejected:
    'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border-red-300',
};

const ApplicationCard = ({ application }: Props) => {
  const { jobId, status, createdAt, resumeUrl } = application;

  return (
    <div
      className={`p-5 bg-bg rounded-2xl shadow-md border hover:shadow-lg transition-transform duration-500 ease-out hover:bg-gray-50 hover:-translate-y-2
        ${
          status === 'shortlisted'
            ? 'border-secondary-500'
            : status === 'rejected'
            ? 'border-red-500'
            : 'border-primary-200'
        }
`}
    >
      {/* Job Info */}
      <div className='flex items-start justify-between'>
        <div>
          <h3
            className='text-xl font-semibold text-gray-600 flex items-center gap-2 
          '
          >
            <Briefcase size={18} />
            {jobId.title}
          </h3>
          <p className='text-gray-600 dark:text-gray-400 text-base mt-1 line-clamp-3'>
            {jobId.description}
          </p>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Footer */}
      <div className='flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400'>
        <div className='flex items-center gap-2'>
          Submitted on
          <Calendar size={16} />
          <span className='font-medium text-gray-700'>
            {formatDate(createdAt)}
          </span>
        </div>

        <a
          href={resumeUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-1 text-primary-500 dark:text-primary-400 hover:underline'
        >
          <FileText size={16} />
          View Resume
        </a>
      </div>
    </div>
  );
};

export default ApplicationCard;
