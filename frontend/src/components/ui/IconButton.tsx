import React from 'react';
import { cn } from '../../utils/cn';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg' | 'custom';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'custom';
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

const variants: Record<string, string> = {
  primary:
    'bg-primary-500 dark:bg-primary-300 text-white hover:bg-primary-600 dark:hover:bg-primary-200 font-medium',
  secondary:
    'bg-secondary-500 dark:bg-secondary-300 text-white hover:bg-secondary-600 dark:hover:bg-secondary-200 ',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  outline:
    'border bg-bg border-primary-200 dark:border-primary-300 text-gray-800 hover:bg-gray-100',
  custom: '',
};

const sizes: Record<string, string> = {
  sm: 'w-8 h-8 p-1',
  md: 'w-10 h-10 p-2',
  lg: 'w-12 h-12 p-3',
  custom: '',
};

const baseStyles =
  'flex items-center justify-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

const IconButton: React.FC<IconButtonProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  isLoading = false,
  className,
  ref,
  ...props
}) => {
  return (
    <button
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      disabled={isLoading || props.disabled}
      ref={ref}
      {...props}
    >
      {isLoading && <span className='animate-spin rounded-full w-4 h-4' />}
      {/* scale icon automatically */}
      <span className='w-5 h-5 flex items-center justify-center'>
        {children}
      </span>
    </button>
  );
};

export default IconButton;
