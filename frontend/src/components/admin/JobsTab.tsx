import { useGetAllJobsQuery } from '../../features/admin/adminApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Table, TableHeader, TableRow, TableCell } from '../ui/table';
import { formatDate } from '../../utils/formateDate';

const JobsTab = () => {
  const { data: jobsData = { results: 0, jobs: [] }, isLoading } =
    useGetAllJobsQuery();

  const { results: jobsCount, jobs } = jobsData;

  const chartData =
    Array.isArray(jobs) && jobsCount > 0
      ? jobs.map((job) => ({
          title: job.title,
          applications: job.applicationsCount ?? 0,
        }))
      : [];

  return (
    <div className='space-y-8'>
      {/* Chart */}
      <div className='p-6 bg-bg rounded-2xl shadow-md'>
        <h3 className='text-xl text-primary-800 font-semibold mb-4'>
          Applications per Job
        </h3>
        {isLoading ? (
          <p>Loading chart...</p>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey='title' />
              <YAxis />
              <Tooltip cursor={false} />
              <Bar
                dataKey='applications'
                fill='rgb(var(--color-primary-500))'
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
          All Jobs
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
