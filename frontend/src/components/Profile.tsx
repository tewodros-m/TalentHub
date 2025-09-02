import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../features/auth/authSlice';
import Button from './ui/Button';
import LinkButton from './ui/LinkButton';

const Profile = () => {
  const { isAuthenticated, role } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
  };

  return (
    <div className='w-60 bg-bg dark:bg-primary-100 z-50 border border-primary-100 rounded-lg shadow-lg p-4 font-medium text-lg text-gray-700 flex flex-col gap-2 items-start'>
      {isAuthenticated && role === 'applicant' && (
        <LinkButton
          to='/applicant/dashboard'
          size='custom'
          variant='custom'
          className='hover:underline'
        >
          My Applications
        </LinkButton>
      )}
      {isAuthenticated && role === 'employer' && (
        <LinkButton
          to='/employer/dashboard'
          size='custom'
          variant='custom'
          className='hover:underline'
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
          Admin Dashboard
        </LinkButton>
      )}
      {isAuthenticated && (
        <Button
          onClick={handleLogout}
          size='custom'
          variant='custom'
          className='hover:underline'
        >
          Logout
        </Button>
      )}
    </div>
  );
};

export default Profile;
