import { timeAgo } from '../../utils/timeAgo';
import { Table, TableHeader, TableRow, TableCell } from '../ui/table';
import { useGetAllApplicationsQuery } from '../../features/application/applicationApi';

const ApplicationsTab = () => {
  const {
    data: applicationsData = { results: 0, applications: [] },
    isLoading,
  } = useGetAllApplicationsQuery();

  const { results: appsCount, applications } = applicationsData;

  return (
    <div className='p-3 bg-bg min-h-screen rounded-2xl shadow-md'>
      <h3 className='text-xl text-primary-800 font-semibold mb-4'>
        All Applications
      </h3>
      <Table>
        <TableHeader
          headers={[
            'Job Title',
            'Employer Email',
            'Applicant Email',
            'Applied',
            'Resume',
            'Status',
          ]}
        />
        {isLoading ? (
          <p>Loading applications...</p>
        ) : appsCount > 0 ? (
          <tbody>
            {applications.map((app, index) => (
              <TableRow key={app._id} isStriped={index % 2 === 0}>
                <TableCell>{app.jobId?.title || 'N/A'}</TableCell>
                <TableCell>{app.jobId?.createdBy?.email || 'N/A'}</TableCell>
                <TableCell>{app.userId?.email || 'N/A'}</TableCell>
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
              </TableRow>
            ))}
          </tbody>
        ) : (
          <p>No applications available</p>
        )}
      </Table>
    </div>
  );
};

export default ApplicationsTab;
