import { useEffect, useRef, useState } from 'react';
import { BellRing, Moon, Sun, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDarkMode } from '../hooks/useDarkMode';
import LinkButton from './ui/LinkButton';
import IconButton from './ui/IconButton';
import NotificationList from './NotificationList';
import { useNotification } from '../hooks/useNotification';
import Profile from './Profile';
import { useClickOutside } from '../hooks/useClickOutside';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLButtonElement>(null);

  const { isAuthenticated, role } = useAuth();
  const { isDark, toggleDarkMode } = useDarkMode();

  const { unreadCount } = useNotification();

  useClickOutside(
    [notificationRef, bellRef],
    () => setShowNotifications(false),
    showNotifications
  );

  useClickOutside(
    [profileRef, userRef],
    () => setShowProfile(false),
    showProfile
  );

  useEffect(() => {
    setShowNotifications(false);
    setShowProfile(false);
  }, [isAuthenticated, role]);

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
          {isAuthenticated && (
            <IconButton
              ref={userRef}
              onClick={() => setShowProfile((prev) => !prev)}
              size='sm'
              variant='primary'
              className='relative'
            >
              <User />
            </IconButton>
          )}
        </div>
        {/* Notifications dropdown */}
        {showNotifications && (
          <div ref={notificationRef} className='absolute right-10 top-10'>
            <NotificationList />
          </div>
        )}
        {showProfile && (
          <div ref={profileRef} className='absolute right-0 top-10'>
            <Profile />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
