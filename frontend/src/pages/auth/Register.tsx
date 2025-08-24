import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRegisterMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../features/auth/authSlice';
import { RegisterSchema } from '../../schema/authSchema';
import type { RegisterRequest } from '../../types/authTypes';
import type { ErrorType } from '../../types/errorType';
import Input from '../../components/Input';

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const res = await registerUser(data).unwrap();
      dispatch(setCredentials(res));
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);

      let errorMessage: string | null = null;

      if (err && (err as ErrorType)?.status === 'FETCH_ERROR') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage =
          (err as ErrorType).data?.message ||
          'Registration failed. Please try again.';
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
        Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <Input
          label='Name'
          id='name'
          placeholder='John'
          {...register('name', { onChange: handleInputChange })}
          error={errors.name?.message}
        />

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

        <div>
          <label
            className='block text-lg leading-3 font-medium mb-[6px]'
            htmlFor='role'
          >
            Role
          </label>
          <select
            {...register('role')}
            className='w-full p-2 border rounded border-gray-300 outline-none focus:ring-2 focus:ring-secondary-500'
          >
            <option value=''>Select a role</option>
            <option value='applicant'>Applicant</option>
            <option value='employer'>Employer</option>
          </select>
          {errors.role && (
            <p className='text-red-500 text-sm '>{errors.role.message}</p>
          )}
        </div>
        {apiError && <p className='text-red-500 text-sm '>{apiError}</p>}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600'
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
