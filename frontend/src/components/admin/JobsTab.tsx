import { useGetAllJobsByAdminQuery } from '../../features/job/jobApi';
import Chart from './Chart';
import JobsTable from './JobsTable';

const JobsTab = () => {
  const { data: jobsData = { results: 0, jobs: [] }, isLoading } =
    useGetAllJobsByAdminQuery({ search: '' });

  const { results: jobsCount, jobs } = jobsData;

  const latestTwentyJobs = jobs.slice(0, 20);

  const chartData =
    Array.isArray(latestTwentyJobs) && jobsCount > 0
      ? latestTwentyJobs.map((job) => ({
          _id: job._id,
          title: job.title,
          Applications: job.applicationsCount ?? 0,
          createdBy: job.createdBy.email,
        }))
      : [];

  return (
    <div className='space-y-4 min-h-screen'>
      {isLoading ? (
        <p>Loading jobs...</p>
      ) : jobsCount > 0 ? (
        <>
          <Chart jobs={chartData} />
          <JobsTable jobs={jobs} />
        </>
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default JobsTab;
