import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../utils/cn';

type LinkButtonProps = LinkProps & {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed';

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

  return (
    <Link
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
