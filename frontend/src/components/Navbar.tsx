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
    <nav className='h-14 flex items-center bg-primary-600 dark:bg-primary-100 text-primary-100 dark:text-primary-900 px-4'>
      <div className='max-w-[1340px] w-full mx-auto flex justify-between items-center'>
        {/* Logo */}
        <LinkButton
          to='/'
          size='custom'
          variant='custom'
          className='text-2xl !font-bold '
        >
          TalentHub
        </LinkButton>

        {/* Links */}
        <div className='flex gap-4 items-center'>
          {!isAuthenticated && (
            <>
              <LinkButton
                to='/login'
                size='custom'
                variant='custom'
                className='hover:underline text-lg'
              >
                Login
              </LinkButton>
              <LinkButton
                to='/register'
                size='custom'
                variant='custom'
                className='hover:underline text-lg'
              >
                Register
              </LinkButton>
            </>
          )}
          {isAuthenticated && role === 'applicant' && (
            <LinkButton
              to='/applicant/dashboard'
              size='custom'
              variant='custom'
              className='hover:underline text-lg'
            >
              My Applications
            </LinkButton>
          )}
          {isAuthenticated && role === 'employer' && (
            <LinkButton
              to='/employer/dashboard'
              size='custom'
              variant='custom'
              className='hover:underline text-lg'
            >
              Employer Dashboard
            </LinkButton>
          )}
          {isAuthenticated && role === 'admin' && (
            <LinkButton
              to='/admin/dashboard'
              size='custom'
              variant='custom'
              className='hover:underline'
            >
              Admin Panel
            </LinkButton>
          )}
          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              size='custom'
              variant='custom'
              className='hover:underline text-lg'
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
