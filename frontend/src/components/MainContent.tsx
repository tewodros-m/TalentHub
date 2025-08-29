import { useState } from 'react';
import { useGetJobsQuery } from '../features/job/jobApi';
import JobCard from './JobCard';
import useDebounce from '../hooks/useDebounce';
import type { ErrorType } from '../types/errorType';

const MainContent = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const {
    data: data = { results: 0, jobs: [] },
    isLoading,
    error: fetchErr,
  } = useGetJobsQuery({
    search: debouncedSearch,
  });

  const jobs = data.jobs || [];

  if (fetchErr) {
    let errorMessage: string | null = null;

    if (fetchErr && (fetchErr as ErrorType)?.status === 'FETCH_ERROR') {
      errorMessage = 'Network error. Please check your connection.';
    } else {
      errorMessage =
        (fetchErr as ErrorType).data?.message ||
        'Failed to load jobs. Please try refreshing the page.';
    }

    return (
      <div className='flex flex-col gap-10'>
        <p className='text-center text-red-500'>{errorMessage}</p>
      </div>
    );
  }

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
          className='w-1/2 py-2 px-5 text-gray-700 bg-gray-50 border-2 border-primary-300 rounded-full  outline-none focus:border-primary-600'
        />
      </div>

      {/* Jobs list */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 mb-5'>
        {isLoading ? (
          <p className='text-center text-gray-500'>Loading jobs...</p>
        ) : data.results > 0 ? (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className='text-center text-gray-500'>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default MainContent;
