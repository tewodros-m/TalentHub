import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-6'>
      <h1 className='text-6xl font-bold text-red-600 dark:text-primary-400'>
        404
      </h1>
      <p className='mt-4 text-xl text-gray-700 dark:text-gray-300'>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to='/'
        className='mt-6 inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg shadow transition'
      >
        <ArrowLeft className='mr-2 inline-block' />
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
