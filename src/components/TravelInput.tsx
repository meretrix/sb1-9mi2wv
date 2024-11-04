import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TravelInputProps {
  label: string;
  icon: LucideIcon;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export default function TravelInput({
  label,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
}: TravelInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative input-group">
        <Icon className="input-icon" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="travel-input"
        />
      </div>
    </div>
  );
}