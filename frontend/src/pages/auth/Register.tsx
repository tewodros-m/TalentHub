import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../features/auth/authSlice';
import { RegisterSchema } from '../../schema/authSchema';
import type { RegisterRequest } from '../../types/authTypes';
import type { ErrorType } from '../../types/errorType';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import SelectInput from '../../components/ui/SelectInput';

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
      else navigate('/');
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
    <div className='max-w-lg min-w-[450px] mx-auto my-20 bg-bg p-6 border border-primary-100 dark:border-primary-200 rounded-lg shadow-xl'>
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

        <SelectInput
          label='Role'
          id='role'
          options={[
            { value: 'applicant', label: 'Applicant' },
            { value: 'employer', label: 'Employer' },
          ]}
          {...register('role')}
          error={errors.role?.message}
        />

        <Button
          type='submit'
          variant='primary'
          isLoading={isLoading}
          className='w-full !mt-10'
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      {/* Switch to Login */}
      <p className='mt-6 text-right text-base text-gray-600 dark:text-gray-300'>
        Already have an account?{' '}
        <Link
          to='/login'
          className='text-primary-500 font-medium hover:underline'
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
