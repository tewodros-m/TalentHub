import {
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from '../../features/admin/adminApi';
import toast from 'react-hot-toast';
import { timeAgo } from '../../utils/timeAgo';
import { Table, TableHeader, TableRow, TableCell } from '../ui/table';

const ApplicationsTab = () => {
  const {
    data: applicationsData = { results: 0, applications: [] },
    isLoading,
  } = useGetAllApplicationsQuery();
  const [updateStatus] = useUpdateApplicationStatusMutation();

  const { results: appsCount, applications } = applicationsData;

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Application marked as ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className='p-6 bg-bg min-h-screen rounded-2xl shadow-md'>
      <h3 className='text-xl text-primary-800 font-semibold mb-4'>
        All Applications
      </h3>
      {isLoading ? (
        <p>Loading applications...</p>
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
                    className='text-primary-500 hover:text-primary-600 font-medium text-sm'
                  >
                    📄 View
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
                          : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                      }`}
                  >
                    {app.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex gap-3'>
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'shortlisted')}
                      className={`px-3 py-1 bg-secondary-500 text-white rounded hover:bg-secondary-600 text-xs ${
                        app.status === 'shortlisted'
                          ? 'opacity-70 cursor-not-allowed'
                          : ''
                      }`}
                      disabled={app.status === 'shortlisted'}
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'rejected')}
                      className={`px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs ${
                        app.status === 'rejected'
                          ? 'opacity-70 cursor-not-allowed'
                          : ''
                      }`}
                      disabled={app.status === 'rejected'}
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
        <p>No applications available</p>
      )}
    </div>
  );
};

export default ApplicationsTab;
