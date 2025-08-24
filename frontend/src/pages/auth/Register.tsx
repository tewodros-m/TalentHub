import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '../../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['applicant', 'employer']),
});

type FormData = z.infer<typeof schema>;
type ErrorType = { status?: string | number; data?: unknown };

const Register = () => {
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await registerUser(data).unwrap();
      dispatch(setCredentials(res));
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-bg p-6 border border-primary-100 rounded-lg shadow'>
      <h2 className='text-2xl font-bold text-primary-500 mb-4 text-center'>
        Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label
            className='block text-lg leading-3 font-medium mb-[6px]'
            htmlFor='name'
          >
            Name
          </label>
          <input
            {...register('name')}
            placeholder='John'
            className='w-full p-2 border rounded border-gray-300 outline-none focus:ring-2 focus:ring-secondary-500'
          />
          {errors.name && (
            <p className='text-red-500 text-sm '>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            className='block text-lg leading-3 font-medium mb-[6px]'
            htmlFor='email'
          >
            Email
          </label>
          <input
            {...register('email')}
            type='email'
            placeholder='john@example.com'
            className='w-full p-2 border rounded border-gray-300 outline-none focus:ring-2 focus:ring-secondary-500'
          />
          {errors.email && (
            <p className='text-red-500 text-sm '>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            className='block text-lg leading-3 font-medium mb-[6px]'
            htmlFor='password'
          >
            Password
          </label>
          <input
            {...register('password')}
            type='password'
            placeholder='******'
            className='w-full placeholder:relative placeholder:top-[3px] p-2 border rounded border-gray-300 outline-none focus:ring-2 focus:ring-secondary-500'
          />
          {errors.password && (
            <p className='text-red-500 text-sm '>{errors.password.message}</p>
          )}
        </div>

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
            <option value='applicant'>Applicant</option>
            <option value='employer'>Employer</option>
          </select>
          {errors.role && (
            <p className='text-red-500 text-sm '>{errors.role.message}</p>
          )}
        </div>
        {error && (error as ErrorType)?.status === 'FETCH_ERROR' ? (
          <p className='text-red-500 text-sm '>
            Network error. Please check your internet connection.
          </p>
        ) : (
          <p className='text-red-500 text-sm '>
            Registration failed. Please try again later.
          </p>
        )}
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
