import { ArrowLeft } from 'lucide-react';
import LinkButton from './ui/LinkButton';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-bg text-center px-6'>
      <h1 className='text-6xl text-red-600 dark:text-red-600 font-bold'>404</h1>
      <p className='mt-4 text-xl text-gray-700 dark:text-gray-500'>
        Oops! This page doesn’t exist.
      </p>
      <LinkButton
        to='/'
        variant='primary'
        className='mt-6 text-white font-medium px-6 py-3 rounded-lg shadow transition'
      >
        <ArrowLeft className='mr-2 inline-block' />
        Go Back Home
      </LinkButton>
    </div>
  );
};

export default NotFound;
