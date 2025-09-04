import { useState } from 'react';
import { Briefcase, FileText } from 'lucide-react';
import Sidebar from '../../components/ui/Sidebar';
import EmployerJobs from '../../components/employer/EmployerJobs';
import EmployerApplications from '../../components/employer/EmployerApplications';
import { useAuth } from '../../hooks/useAuth';
import Welcome from '../../components/Welcome';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('employerJobs');

  const { user } = useAuth();

  const tabs = [
    { id: 'employerJobs', label: 'Jobs', icon: <Briefcase size={18} /> },
    {
      id: 'employerApplications',
      label: 'Applications',
      icon: <FileText size={18} />,
    },
  ];

  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onSelect={setActiveTab} tabs={tabs} />

      {/* Main Content */}
      <div className='flex-1 ml-56 mt-20 pl-2 bg-bg min-h-screen relative'>
        {/* Welcome message */}
        <Welcome name={user!.name} />

        {/* H1 title */}
        <h1 className='text-3xl font-bold text-primary-600 my-8 border-b border-gray-200 pb-2'>
          Employer Dashboard
        </h1>

        {activeTab === 'employerJobs' && <EmployerJobs />}
        {activeTab === 'employerApplications' && <EmployerApplications />}
      </div>
    </div>
  );
};

export default EmployerDashboard;
