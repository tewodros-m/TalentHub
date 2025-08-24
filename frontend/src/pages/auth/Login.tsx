import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLoginMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../features/auth/authSlice';
import { LoginSchema } from '../../schema/authSchema';
import type { LoginRequest } from '../../types/authTypes';
import Input from '../../components/Input';
import type { ErrorType } from '../../types/errorType';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [apiError, setApiError] = useState<string | null>(null);
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

      setApiError(errorMessage);
    }
  };

  // clear error when user types
  const handleInputChange = () => {
    if (apiError) setApiError(null);
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-bg p-6 border border-primary-100 rounded-lg shadow'>
      <h2 className='text-2xl font-bold text-primary-500 mb-4 text-center'>
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <Input
          label='Email'
          id='email'
          type='email'
          placeholder='john@example.com'
          {...register('email', { onChange: handleInputChange })}
          error={errors.email?.message}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          placeholder='******'
          {...register('password', { onChange: handleInputChange })}
          error={errors.password?.message}
        />

        {apiError && <p className='text-red-500 text-sm '>{apiError}</p>}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600'
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
