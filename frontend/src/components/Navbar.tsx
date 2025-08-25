import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className='bg-primary-500 text-white px-6 py-3 flex justify-between items-center'>
      <Link to='/' className='text-2xl font-bold'>
        TalentHub
      </Link>

      <div className='flex gap-4 items-center'>
        {!user ? (
          <>
            <Link to='/login' className='hover:underline'>
              Login
            </Link>
            <Link to='/register' className='hover:underline'>
              Register
            </Link>
          </>
        ) : (
          <>
            <span className='font-medium'>Welcome, {user.name}</span>
            <button
              onClick={() => dispatch(logout())}
              className='hover:underline'
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
