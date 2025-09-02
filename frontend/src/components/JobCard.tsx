import { Briefcase, Clock } from 'lucide-react';
import type { Job } from '../types/jobTypes';
import { timeAgo } from '../utils/timeAgo';
import { useAuth } from '../hooks/useAuth';
import LinkButton from './ui/LinkButton';
import Button from './ui/Button';

const JobCard = ({ job }: { job: Job }) => {
  const { isAuthenticated, role } = useAuth();

  const passedTime = timeAgo(new Date(job.createdAt));

  return (
    <div className='rounded-2xl border border-primary-200 bg-bg shadow-md hover:shadow-xl  p-5 flex flex-col transition-transform duration-500 ease-out hover:-translate-y-2 mb-6 z-10'>
      {/* Title */}
      <h3 className='text-xl font-semibold text-primary-600 flex items-center gap-2'>
        <Briefcase className='w-5 h-5' /> {job.title}
      </h3>

      {/* Meta Info */}
      <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mt-2'>
        <span className='flex items-center gap-1'>
          <Clock className='w-4 h-4' />
          Posted {passedTime}
        </span>
      </div>

      {/* Description w*/}
      <p className='text-gray-600 mt-3 line-clamp-3'>
        <span className='text-lg text-gray-700 font-semibold'>
          Job description:
        </span>{' '}
        {job.description}
      </p>

      {/* Skills */}
      {job.skills.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-3'>
          <span className='text-lg text-gray-700 font-semibold'>
            Required Skills:
          </span>
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
          role === 'applicant' ? (
            <LinkButton to={`/apply/${job._id}`} variant='primary'>
              Apply Now
            </LinkButton>
          ) : (
            <Button disabled className='rounded-lg' variant='primary'>
              Apply Now
            </Button>
          )
        ) : (
          <LinkButton to='/login' variant='primary'>
            Login to Apply
          </LinkButton>
        )}
      </div>
    </div>
  );
};

export default JobCard;
