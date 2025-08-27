import { useSelector } from 'react-redux';
import { useGetMyApplicationsQuery } from '../../features/application/applicationApi';
import type { RootState } from '../../app/store';
import ApplicationCard from '../../components/ApplicationCard';

const ApplicantDashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: data = { results: 0, applications: [] }, isLoading } =
    useGetMyApplicationsQuery(user!.id);

  const { results, applications } = data;

  return (
    <div className='max-w-4xl min-h-screen mx-auto mt-10 p-6 bg-bg rounded-2xl shadow-lg'>
      {/* Dashboard Title */}
      <h2 className='text-2xl font-bold text-primary-900 mb-6'>
        My Applications
      </h2>

      {/* Loading State */}
      {isLoading ? (
        <p className='text-gray-500 text-center'>Loading applications...</p>
      ) : results > 0 ? (
        <div className='grid gap-6'>
          {applications.map((app) => (
            <ApplicationCard key={app._id} application={app} />
          ))}
        </div>
      ) : (
        <div className='m-10'>
          <p className='text-gray-500 text-center text-lg'>
            No submitted applications.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicantDashboard;
