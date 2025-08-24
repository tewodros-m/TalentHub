import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  return (
    <nav className='bg-primary text-white px-6 py-3 flex justify-between items-center'>
      <Link to='/' className='text-2xl font-bold'>
        TalentHub
      </Link>
      <div className='flex gap-4 items-center'>
        <Link to='/login' className='hover:underline'>
          Login
        </Link>
        <Link to='/register' className='hover:underline'>
          Register
        </Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
