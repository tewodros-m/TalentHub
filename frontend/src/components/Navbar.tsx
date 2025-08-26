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
    <nav className='bg-primary-500 text-white px-6 py-3'>
      <div className='max-w-[1340px] w-full mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='text-xl font-bold'>
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
              className='ml-4 bg-secondary-500 px-3 py-1 rounded hover:bg-secondary-600'
            >
              Logout
            </button>
          )}
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className='ml-4 p-2 rounded-full bg-secondary-500 hover:bg-secondary-600 transition'
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
