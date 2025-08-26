import { Link } from 'react-router-dom';
import { Briefcase, Clock } from 'lucide-react';
import type { Job } from '../types/jobTypes';
import { timeAgo } from '../utils/timeAgo';

interface Props {
  job: Job;
  isAuthenticated: boolean;
}

const JobCard = ({ job, isAuthenticated }: Props) => {
  const passedTime = timeAgo(new Date(job.createdAt));

  return (
    <div className='rounded-2xl border border-secondary-200 bg-white shadow-md hover:shadow-xl  p-5 flex flex-col transition-transform duration-500 ease-out hover:-translate-y-2'>
      {/* Title */}
      <h3 className='text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-2'>
        <Briefcase className='w-5 h-5' /> {job.title}
      </h3>

      {/* Meta Info */}
      <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mt-2'>
        <span className='flex items-center gap-1'>
          <Clock className='w-4 h-4' />
          Posted {passedTime}
        </span>
      </div>

      {/* Description */}
      <p className='text-gray-600 mt-3 line-clamp-3'>
        <span className='text-lg text-gray-800'>Job description:</span>{' '}
        {job.description}
      </p>

      {/* Skills */}
      {job.skills.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-3'>
          <span className='text-lg text-gray-800'>Required Skills:</span>
          {job.skills.map((skill) => (
            <span
              key={skill}
              className='inline-block px-3 py-1 rounded-full bg-secondary-100 text-secondary-800 font-medium'
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Action Button */}
      <div className='mt-4'>
        {isAuthenticated ? (
          <Link
            to={`/apply/${job._id}`}
            className='text-center px-4 py-2 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition'
          >
            Apply Now
          </Link>
        ) : (
          <Link
            to='/login'
            className='text-center px-4 py-2 rounded-lg bg-primary-500 text-white font-medium hover:bg-secondary-600 transition'
          >
            Login to Apply
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;
