import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGetUserApplicationsQuery } from '../../features/application/applicationApi';
import ApplicationCard from '../../components/applicant/ApplicationCard';
import { useAuth } from '../../hooks/useAuth';
import Welcome from '../../components/Welcome';
import Button from '../../components/ui/Button';
import { type ApplicationStatus } from '../../types/applicationTypes';

const statuses = ['all', 'applied', 'shortlisted', 'rejected'];

type filterStatus = ApplicationStatus | 'all';

const ApplicantDashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState<filterStatus>('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: data = { results: 0, applications: [] }, isLoading } =
    useGetUserApplicationsQuery({
      userId: user!.id,
      status: selectedStatus !== 'all' ? selectedStatus : undefined,
    });

  const { results, applications } = data;

  return (
    <div className='max-w-4xl min-h-screen mx-auto mt-20 pb-10 mb-10 px-4 bg-bg rounded-2xl shadow-lg relative pt-6'>
      <Button
        onClick={() => navigate('/')}
        variant='custom'
        size='custom'
        className='absolute left-0 p-2 -top-5 hover:-left-1 transition-all duration-200 border-none text-gray-600'
      >
        <ArrowLeft className='mr-2 inline-block' />
        Back
      </Button>
      <Welcome name={user!.name} />

      {/* Dashboard Title */}
      <h2 className='text-3xl font-bold text-primary-600 mb-8 border-b border-gray-200 py-2'>
        My Applications
      </h2>

      {/* Filter Buttons */}
      <div className='flex gap-3 mb-6'>
        {statuses.map((status) => (
          <Button
            key={status}
            onClick={() => setSelectedStatus(status as filterStatus)}
            variant={selectedStatus === status ? 'primary' : 'outline'}
            size='sm'
            className='transition-none'
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

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
            No {selectedStatus !== 'all' ? selectedStatus : ''} applications
            found.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicantDashboard;
