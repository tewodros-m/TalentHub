import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useGetAllJobsQuery } from '../../features/admin/adminApi';
import { Table, TableHeader, TableRow, TableCell } from '../ui/table';
import { formatDate } from '../../utils/formateDate';
import { useDarkMode } from '../../hooks/useDarkMode';

const JobsTab = () => {
  const { data: jobsData = { results: 0, jobs: [] }, isLoading } =
    useGetAllJobsQuery();
  const { isDark } = useDarkMode();

  const { results: jobsCount, jobs } = jobsData;

  const chartData =
    Array.isArray(jobs) && jobsCount > 0
      ? jobs.map((job) => ({
          _id: job._id,
          title: job.title,
          Applications: job.applicationsCount ?? 0,
        }))
      : [];

  const latestTwentyJobs = chartData.slice(0, 20);

  return (
    <div className='space-y-4 min-h-screen'>
      {/* Chart */}
      <div className='p-3 bg-bg shadow-md'>
        <h3 className='text-xl text-primary-800 font-semibold mb-4'>
          Applications per Job for Latest 20 Jobs
        </h3>
        {isLoading ? (
          <p>Loading chart...</p>
        ) : latestTwentyJobs.length > 0 ? (
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={latestTwentyJobs}>
              <XAxis dataKey='_id' tick={false} />
              <YAxis
                allowDecimals={false}
                tickFormatter={(value) => Math.floor(value).toString()}
              />

              <Tooltip
                cursor={false}
                labelFormatter={(value) => {
                  // Find the actual job by id and return its title for tooltip
                  const job = latestTwentyJobs.find((job) => job._id === value);
                  return job ? job.title : value;
                }}
                contentStyle={{
                  backgroundColor: 'rgb(var(--color-bg))',
                  border: '2px solid rgb(var(--color-primary-100))',
                  borderRadius: '8px',
                }}
                itemStyle={{
                  color: 'rgb(var(--color-primary-600))',
                }}
                labelStyle={{
                  color: 'rgb(var(--color-primary-600))',
                  fontWeight: 600,
                }}
              />
              <Bar
                dataKey='Applications'
                fill={
                  isDark
                    ? 'rgb(var(--color-primary-300))'
                    : 'rgb(var(--color-primary-500))'
                }
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No jobs available</p>
        )}
      </div>

      {/* Jobs Table */}
      <div className='p-6 bg-bg rounded-2xl shadow-md'>
        <h3 className='text-xl text-primary-800 font-semibold mb-4'>
          All Jobs with Number of Applications
        </h3>
        {isLoading ? (
          <p>Loading jobs...</p>
        ) : jobsCount > 0 ? (
          <Table>
            <TableHeader
              headers={[
                'Title',
                'Employer Name',
                'Employer Email',
                'No. Applications',
                'Posted Date',
              ]}
            />
            <tbody>
              {jobs.map((job, i) => (
                <TableRow key={job._id} isStriped={i % 2 === 0}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.createdBy.name}</TableCell>
                  <TableCell>{job.createdBy.email}</TableCell>
                  <TableCell align='center'>
                    {job.applicationsCount ?? 0}
                  </TableCell>
                  <TableCell>{formatDate(job.createdAt)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default JobsTab;
