import { useState } from 'react';
import { Briefcase, FileText } from 'lucide-react';
import Sidebar from '../../components/ui/Sidebar';
import JobsTab from '../../components/admin/JobsTab';
import ApplicationsTab from '../../components/admin/ApplicationsTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const tabs = [
    { id: 'jobs', label: 'Jobs', icon: <Briefcase size={18} /> },
    { id: 'applications', label: 'Applications', icon: <FileText size={18} /> },
  ];

  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onSelect={setActiveTab} tabs={tabs} />

      {/* Main Content */}
      <div className='flex-1 ml-56 mt-20 pl-2 bg-bg min-h-screen'>
        {/* H1 title */}
        <h1 className='text-3xl font-bold text-primary-600 mb-6 border-b border-gray-200 pb-2'>
          Admin Dashboard
        </h1>

        {activeTab === 'jobs' && <JobsTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
      </div>
    </div>
  );
};

export default AdminDashboard;
