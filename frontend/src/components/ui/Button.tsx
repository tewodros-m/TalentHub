import React from 'react';
import { cn } from '../../utils/cn'; // helper for merging classes

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
};

const baseStyles =
  'inline-flex items-center justify-center rounded font-medium transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<string, string> = {
  primary:
    'bg-primary-500 dark:bg-primary-300 text-white hover:bg-primary-600 dark:hover:bg-primary-200 font-medium',
  secondary:
    'bg-secondary-500 dark:bg-secondary-300 text-white hover:bg-secondary-600 dark:hover:bg-secondary-200 ',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  outline:
    'border bg-bg border-primary-200 dark:border-primary-300 text-gray-800 hover:bg-gray-100',
  custom: '', // no default styling
};

const sizes: Record<string, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className='animate-spin' /> : null}
      {children}
    </button>
  );
};

export default Button;
