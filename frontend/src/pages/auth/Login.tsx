import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../features/auth/authSlice';
import { LoginSchema } from '../../schema/authSchema';
import type { LoginRequest } from '../../types/authTypes';
import Input from '../../components/ui/Input';
import type { ErrorType } from '../../types/errorType';
import Button from '../../components/ui/Button';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      toast.success('Logged in successfully!');
      if (res.user.role === 'admin') navigate('/admin/dashboard');
      else if (res.user.role === 'employer') navigate('/employer/dashboard');
      else navigate('/applicant/dashboard');
    } catch (err) {
      console.error('Login failed', err);

      let errorMessage: string | null = null;

      if (err && (err as ErrorType)?.status === 'FETCH_ERROR') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage =
          (err as ErrorType).data?.message || 'Login failed. Please try again.';
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className='max-w-lg min-w-[450px] mx-auto mt-10 bg-bg p-6 border border-primary-100 dark:border-primary-200 rounded-lg shadow-xl'>
      <h2 className='text-2xl font-bold text-primary-500 mb-4 text-center'>
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <Input
          label='Email'
          id='email'
          type='email'
          placeholder='john@example.com'
          // defaultValue='employer@talenthub.com'
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          placeholder='******'
          // defaultValue='password123'
          {...register('password')}
          error={errors.password?.message}
        />

        <Button
          type='submit'
          variant='primary'
          isLoading={isLoading}
          className='w-full !mt-10'
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      {/* Switch to register */}
      <p className='mt-6 text-right text-base text-gray-600 dark:text-gray-300'>
        Don&apos;t have an account?{' '}
        <Link
          to='/register'
          className='text-primary-500 font-medium hover:underline'
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
