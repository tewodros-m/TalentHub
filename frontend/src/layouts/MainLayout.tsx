import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <Navbar />
      <main className='flex-1 p-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
