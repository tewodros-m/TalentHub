import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className='min-h-screen  flex flex-col bg-bg text-gray-900'>
      <Navbar />
      <main className='max-w-[1340px] flex-1 container mx-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
