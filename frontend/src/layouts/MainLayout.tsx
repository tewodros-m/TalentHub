import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className='min-h-screen  mx-auto flex flex-col bg-bg text-text'>
      <Navbar />
      <main className='max-w-[1340px] flex-1 p-4 '>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
