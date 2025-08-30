import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from './Button';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={id}
            className='block text-lg font-medium text-gray-600 mb-1'
          >
            {label}
          </label>
        )}

        <div className='relative'>
          <input
            ref={ref}
            id={id}
            type={isPassword && showPassword ? 'text' : type}
            {...props}
            className={`w-full p-2 border rounded outline-none bg-bg
              placeholder:text-gray-400
              ${
                error
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-2 focus:ring-primary-600'
              }
              ${className}`}
          />

          {/* Toggle icon only for password fields */}
          {isPassword && (
            <Button
              type='button'
              variant='custom'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 px-[6px] py-1 rounded'
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </Button>
          )}
        </div>
        {error && <p className='text-red-500 text-sm '>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
