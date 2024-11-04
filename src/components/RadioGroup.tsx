import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function RadioGroup({
  name,
  options,
  value,
  onChange,
  className = '',
}: RadioGroupProps) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            flex-1 flex items-center justify-center px-4 py-2 rounded-md cursor-pointer
            text-sm font-medium transition-colors
            ${value === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}