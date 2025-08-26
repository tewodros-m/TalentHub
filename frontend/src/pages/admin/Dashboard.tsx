import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import JobsTab from '../../components/admin/JobsTab';
import ApplicationsTab from '../../components/admin/ApplicationsTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onSelect={setActiveTab} />

      {/* Main Content */}
      <div className='flex-1 ml-56 pl-2 py-4 bg-bg min-h-screen'>
        {/* H1 title */}
        <h1 className='text-2xl font-bold text-primary-900 mb-6'>
          Admin Dashboard
        </h1>

        {activeTab === 'jobs' && <JobsTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
      </div>
    </div>
  );
};

export default AdminDashboard;
