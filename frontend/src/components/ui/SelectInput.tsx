import React from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Option[];
  error?: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className='block text-lg leading-3 font-medium mb-[6px]'
        >
          {label}
        </label>
      )}

      <select
        id={id}
        {...props}
        className={`w-full p-2 border rounded outline-none bg-bg
              ${
                error
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-2 focus:ring-primary-600'
              }
              ${className}`}
      >
        <option value=''>Select {label?.toLowerCase() || 'option'}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default SelectInput;
