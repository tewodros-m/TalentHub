const Welcome = ({ name }: { name: string }) => {
  return (
    <p className='absolute right-0 -top-5 text-lg p-2 text-gray-600'>
      Welcome, <span className='text-primary-600 font-medium'>{name}</span>
    </p>
  );
};

export default Welcome;
