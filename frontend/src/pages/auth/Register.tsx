import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../features/auth/authSlice';
import { RegisterSchema } from '../../schema/authSchema';
import type { RegisterRequest } from '../../types/authTypes';
import type { ErrorType } from '../../types/errorType';
import Input from '../../components/Input';

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();

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
      toast.success('Registered successfully!');
      if (res.user.role === 'admin') navigate('/admin/dashboard');
      else if (res.user.role === 'employer') navigate('/employer/dashboard');
      else navigate('/applicant/dashboard');
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

      toast.error(errorMessage);
    }
  };

  return (
    <div className='max-w-md mx-auto my-10 bg-bg p-6 border border-primary-100 dark:border-primary-200 rounded-lg shadow-xl'>
      <h2 className='text-2xl font-bold text-primary-500 mb-4 text-center'>
        Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <Input
          label='Name'
          id='name'
          placeholder='John'
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label='Email'
          id='email'
          type='email'
          placeholder='john@example.com'
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          placeholder='******'
          {...register('password')}
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
            className='w-full p-2 border rounded outline-none bg-bg
               focus:ring-2 focus:ring-primary-500'
          >
            <option value='' className='hover:bg-primary-100'>
              Select a role
            </option>
            <option value='applicant'>Applicant</option>
            <option value='employer'>Employer</option>
          </select>
          {errors.role && (
            <p className='text-red-500 text-sm '>{errors.role.message}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-primary-500 dark:bg-primary-200 text-white py-2 rounded hover:bg-primary-600 dark:hover:bg-primary-100 transition'
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
