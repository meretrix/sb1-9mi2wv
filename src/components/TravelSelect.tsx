import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TravelSelectProps {
  label: string;
  icon: LucideIcon;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
}

export default function TravelSelect({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  required = false,
  className = '',
}: TravelSelectProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative input-group select-wrapper">
        <Icon className="input-icon" />
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="travel-select pl-10"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}