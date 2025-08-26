import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetJobsQuery } from '../features/job/jobApi';
import type { RootState } from '../app/store';
import JobCard from '../components/JobCard';
import useDebounce from '../hooks/useDebounce';

const Landing = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data: data = { results: 0, jobs: [] }, isLoading } = useGetJobsQuery({
    search: debouncedSearch,
  });
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  const jobs = data.jobs || [];

  return (
    <div className='container mx-auto mt-6'>
      <h1 className='text-3xl font-bold text-center text-primary-500'>
        Find Your Next Job
      </h1>

      {/* Search bar */}
      <div className='flex justify-center mt-6'>
        <input
          type='text'
          placeholder='Search jobs by keyword or skill...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-1/2 p-2 border-2 border-primary-100 rounded  outline-none focus:border-secondary-600 '
        />
      </div>

      {/* Jobs list */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-20'>
        {isLoading ? (
          <p className='text-center text-gray-500'>Loading jobs...</p>
        ) : data.results > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isAuthenticated={isAuthenticated}
            />
          ))
        ) : (
          <p className='text-center text-gray-500'>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Landing;
