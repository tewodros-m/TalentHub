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
          title: job.title,
          Applications: job.applicationsCount ?? 0,
        }))
      : [];

  const latestTenJobs = chartData.slice(0, 10);
  console.log('latest jobs', latestTenJobs);

  return (
    <div className='space-y-8'>
      {/* Chart */}
      <div className='p-6 bg-bg rounded-2xl shadow-md'>
        <h3 className='text-xl text-primary-800 font-semibold mb-4'>
          Applications per Job for Latest 10 Jobs
        </h3>
        {isLoading ? (
          <p>Loading chart...</p>
        ) : latestTenJobs.length > 0 ? (
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey='title' />
              <YAxis />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: isDark ? 'rgb(0,0,0)' : 'rgb(255,255,255)',
                  border:
                    '1px solid ' +
                    (isDark
                      ? 'rgb(var(--color-primary-200))'
                      : 'rgb(var(--color-primary-100))'),
                  borderRadius: '8px',
                }}
                itemStyle={{
                  color: isDark
                    ? 'rgb(var(--color-gray-800))'
                    : 'rgb(var(--color-gray-800))',
                }}
                labelStyle={{
                  color: isDark
                    ? 'rgb(var(--color-gray-800))'
                    : 'rgb(var(--color-gray-900))',
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
            <TableHeader headers={['Title', 'Applications', 'Created At']} />
            <tbody>
              {jobs.map((job, i) => (
                <TableRow key={job._id} isStriped={i % 2 === 0}>
                  <TableCell>{job.title}</TableCell>
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
