import { useDispatch } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../features/auth/authSlice';
import { useDarkMode } from '../hooks/useDarkMode';
import Button from './ui/Button';
import LinkButton from './ui/LinkButton';

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
        <LinkButton
          to='/'
          variant='custom'
          className='!text-2xl !font-bold px-0 py-0'
        >
          TalentHub
        </LinkButton>

        {/* Links */}
        <div className='flex gap-4 items-center'>
          {!isAuthenticated && (
            <>
              <LinkButton
                to='/login'
                variant='custom'
                className='hover:underline px-0 py-0'
              >
                Login
              </LinkButton>
              <LinkButton
                to='/register'
                variant='custom'
                className='hover:underline px-0 py-0'
              >
                Register
              </LinkButton>
            </>
          )}
          {isAuthenticated && role === 'applicant' && (
            <LinkButton
              to='/applicant/dashboard'
              variant='custom'
              className='hover:underline px-0 py-0'
            >
              My Applications
            </LinkButton>
          )}
          {isAuthenticated && role === 'employer' && (
            <LinkButton
              to='/employer/dashboard'
              variant='custom'
              className='hover:underline px-0 py-0'
            >
              Employer Dashboard
            </LinkButton>
          )}
          {isAuthenticated && role === 'admin' && (
            <LinkButton
              to='/admin/dashboard'
              variant='custom'
              className='hover:underline px-0 py-0'
            >
              Admin Panel
            </LinkButton>
          )}
          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              variant='custom'
              className='ml-4 px-3 py-1 hover:underline'
            >
              Logout
            </Button>
          )}
          {/* Dark mode toggle */}
          <Button
            onClick={toggleDarkMode}
            variant='custom'
            className='ml-4 px-0 py-0 w-10 h-10 rounded-full hover:bg-primary-700 dark:hover:bg-primary-200 transition'
            aria-label='Toggle dark mode'
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
