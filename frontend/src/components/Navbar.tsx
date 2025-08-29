import { useDispatch } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../features/auth/authSlice';
import { useDarkMode } from '../hooks/useDarkMode';
import Button from './ui/Button';
import LinkButton from './ui/LinkButton';
import IconButton from './ui/IconButton';

const Navbar = () => {
  const { isAuthenticated, role } = useAuth();
  const dispatch = useDispatch();
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
  };

  return (
    <nav className='h-14 flex items-center bg-primary-600 dark:bg-primary-100 text-gray-100 dark:text-gray-900 px-4'>
      <div className='max-w-[1340px] w-full mx-auto flex justify-between items-center'>
        {/* Logo */}
        <LinkButton
          to='/'
          size='sm'
          variant='custom'
          className='!text-2xl !font-bold'
        >
          TalentHub
        </LinkButton>

        {/* Links */}
        <div className='flex gap-4 items-center'>
          {!isAuthenticated && (
            <>
              <LinkButton
                to='/login'
                size='sm'
                variant='custom'
                className='hover:underline'
              >
                Login
              </LinkButton>
              <LinkButton
                to='/register'
                size='sm'
                variant='custom'
                className='hover:underline'
              >
                Register
              </LinkButton>
            </>
          )}
          {isAuthenticated && role === 'applicant' && (
            <LinkButton
              to='/applicant/dashboard'
              size='sm'
              variant='custom'
              className='hover:underline'
            >
              My Applications
            </LinkButton>
          )}
          {isAuthenticated && role === 'employer' && (
            <LinkButton
              to='/employer/dashboard'
              size='sm'
              variant='custom'
              className='hover:underline'
            >
              Employer Dashboard
            </LinkButton>
          )}
          {isAuthenticated && role === 'admin' && (
            <LinkButton
              to='/admin/dashboard'
              size='sm'
              variant='custom'
              className='hover:underline'
            >
              Admin Panel
            </LinkButton>
          )}
          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              size='sm'
              variant='custom'
              className='hover:underline'
            >
              Logout
            </Button>
          )}
          {/* Dark mode toggle */}
          <IconButton onClick={toggleDarkMode} size='sm' variant='primary'>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
