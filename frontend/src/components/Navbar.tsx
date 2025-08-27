import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useDarkMode } from '../hooks/useDarkMode';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, role } = useAuth();
  const dispatch = useDispatch();
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='bg-primary-600 dark:bg-primary-100 text-gray-100 dark:text-gray-900 px-6 py-3'>
      <div className='max-w-[1340px] w-full mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='text-2xl font-bold'>
          TalentHub
        </Link>

        {/* Links */}
        <div className='flex gap-4 items-center'>
          {!isAuthenticated && (
            <>
              <Link to='/login' className='hover:underline'>
                Login
              </Link>
              <Link to='/register' className='hover:underline'>
                Register
              </Link>
            </>
          )}
          {isAuthenticated && role === 'applicant' && (
            <Link to='/applicant/dashboard' className='hover:underline'>
              My Applications
            </Link>
          )}
          {isAuthenticated && role === 'employer' && (
            <Link to='/employer/dashboard' className='hover:underline'>
              Employer Dashboard
            </Link>
          )}
          {isAuthenticated && role === 'admin' && (
            <Link to='/admin/dashboard' className='hover:underline'>
              Admin Panel
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className='ml-4 px-3 py-1 hover:underline'
            >
              Logout
            </button>
          )}
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className='ml-4 p-2 rounded-full  hover:bg-primary-700 dark:hover:bg-primary-200 transition'
            aria-label='Toggle dark mode'
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
