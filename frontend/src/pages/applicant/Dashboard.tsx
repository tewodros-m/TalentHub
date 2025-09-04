import { useGetMyApplicationsQuery } from '../../features/application/applicationApi';
import ApplicationCard from '../../components/applicant/ApplicationCard';
import { useAuth } from '../../hooks/useAuth';
import Welcome from '../../components/Welcome';

const ApplicantDashboard = () => {
  const { user } = useAuth();

  const { data: data = { results: 0, applications: [] }, isLoading } =
    useGetMyApplicationsQuery(user!.id);

  const { results, applications } = data;

  return (
    <div className='max-w-4xl min-h-screen mx-auto mt-20 px-4 bg-bg rounded-2xl shadow-lg relative pt-6'>
      <Welcome name={user!.name} />
      {/* Dashboard Title */}
      <h2 className='text-3xl font-bold text-primary-600 mb-8 border-b border-gray-200 py-2'>
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
