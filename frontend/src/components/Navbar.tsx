import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BellRing, Moon, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../features/auth/authSlice';
import { useDarkMode } from '../hooks/useDarkMode';
import Button from './ui/Button';
import LinkButton from './ui/LinkButton';
import IconButton from './ui/IconButton';
import NotificationList from './NotificationList';
import { useNotification } from '../hooks/useNotification';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);
  const { isAuthenticated, role } = useAuth();
  const dispatch = useDispatch();
  const { isDark, toggleDarkMode } = useDarkMode();

  const { unreadCount } = useNotification();

  useEffect(() => {
    setShowNotifications(false);
  }, [isAuthenticated, role]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationRef, showNotifications]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
  };

  return (
    <nav className='h-14 fixed w-full flex items-center bg-primary-600 dark:bg-primary-100 text-primary-100 dark:text-primary-900 px-4 z-40'>
      <div className='max-w-[1340px] w-full mx-auto flex justify-between items-center relative'>
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
          {isAuthenticated && role === 'employer' && (
            <IconButton
              ref={bellRef}
              onClick={() => setShowNotifications((prev) => !prev)}
              size='sm'
              variant='primary'
              className='relative'
            >
              <BellRing />
              {unreadCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1'>
                  {unreadCount}
                </span>
              )}
            </IconButton>
          )}
        </div>
        {/* Notifications dropdown */}
        {showNotifications && (
          <div ref={notificationRef} className='absolute right-4 top-10'>
            <NotificationList />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
