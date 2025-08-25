import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={id}
            className='block text-lg font-medium text-gray-700 mb-1'
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          {...props}
          className={`w-full p-2 border rounded outline-none
              placeholder:text-gray-400
              ${
                error
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-2 focus:ring-secondary-500'
              }
              ${className}`}
        />
        {error && <p className='text-red-500 text-sm '>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
