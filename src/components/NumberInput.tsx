import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  min = 1,
  max = 99,
  className = '',
}: NumberInputProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="number-input-group">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={value <= min}
          className="number-btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="number-display">{value}</span>
        <button
          type="button"
          onClick={handleIncrease}
          disabled={value >= max}
          className="number-btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}