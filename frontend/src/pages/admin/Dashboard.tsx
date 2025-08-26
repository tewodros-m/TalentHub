import {
  useGetAllJobsQuery,
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from '../../features/admin/adminApi';
import toast from 'react-hot-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { timeAgo } from '../../utils/timeAgo';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from '../../components/ui/table';

const AdminDashboard = () => {
  const { data: jobsData = { results: 0, jobs: [] }, isLoading: jobsLoading } =
    useGetAllJobsQuery();
  const {
    data: applicationsData = { results: 0, applications: [] },
    isLoading: appsLoading,
  } = useGetAllApplicationsQuery();
  const [updateStatus] = useUpdateApplicationStatusMutation();

  const { results: jobsCount, jobs } = jobsData;
  const { results: appsCount, applications } = applicationsData;

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Application marked as ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  // Chart data
  const chartData =
    Array.isArray(jobs) && jobsCount > 0
      ? jobs.map((job) => ({
          title: job.title,
          applications: job.applicationsCount ?? 0,
        }))
      : [];

  return (
    <div className='space-y-10'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold text-primary-900'>Admin Dashboard</h2>
        <p className='text-gray-500 text-sm'>
          Manage jobs & applications at a glance
        </p>
      </div>

      {/* Analytics */}
      <div className='p-6 bg-bg rounded-2xl shadow-md hover:shadow-lg transition'>
        <h3 className='text-xl font-semibold text-primary-800 mb-6'>
          Applications per Job
        </h3>
        {jobsLoading ? (
          <p className='text-gray-500'>Loading chart...</p>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer
            width='100%'
            height={300}
            className='border border-gray-300 focus:outline-none'
          >
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
          <p className='text-gray-500'>No job data available</p>
        )}
      </div>

      {/* Applications Table */}
      <div className='p-6 bg-bg rounded-2xl shadow-md hover:shadow-lg transition'>
        <h3 className='text-xl font-semibold text-primary-800 mb-6'>
          All Applications
        </h3>
        {appsLoading ? (
          <p className='text-gray-500'>Loading applications...</p>
        ) : appsCount > 0 ? (
          <Table>
            <TableHeader
              headers={[
                'Job Title',
                'Applicant',
                'Email',
                'Applied',
                'Resume',
                'Status',
                'Actions',
              ]}
            />
            <tbody>
              {applications.map((app, index) => (
                <TableRow key={app._id} isStriped={index % 2 === 0}>
                  <TableCell>{app.jobId.title}</TableCell>
                  <TableCell>{app.userId!.name}</TableCell>
                  <TableCell>{app.userId!.email}</TableCell>
                  <TableCell>{timeAgo(new Date(app.createdAt))}</TableCell>
                  <TableCell>
                    <a
                      href={app.resumeUrl}
                      target='_blank'
                      rel='noreferrer'
                      className='text-primary-500 hover:text-primary-600 font-medium text-sm hover:underline'
                    >
                      View
                    </a>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          app.status === 'applied'
                            ? 'bg-primary-100 text-primary-600'
                            : app.status === 'shortlisted'
                            ? 'bg-secondary-100 text-secondary-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {app.status}
                    </span>
                  </TableCell>
                  <TableCell align='right'>
                    <div className='flex gap-2 justify-end'>
                      <button
                        disabled={app.status === 'shortlisted'}
                        onClick={() =>
                          handleStatusUpdate(app._id, 'shortlisted')
                        }
                        className={`px-3 py-1 bg-secondary-500 text-white rounded text-sm ${
                          app.status === 'shortlisted'
                            ? 'hover:bg-secondary-500'
                            : 'hover:bg-secondary-600'
                        }`}
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                        className={`px-3 py-1 bg-red-500 text-white rounded text-sm ${
                          app.status === 'rejected'
                            ? 'hover:bg-red-500'
                            : 'hover:bg-red-600'
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className='text-gray-500'>No applications available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
