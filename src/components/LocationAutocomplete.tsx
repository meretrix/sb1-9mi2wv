import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Loader } from 'lucide-react';

interface Location {
  city: string;
  airport?: string;
  code?: string;
  country: string;
}

// Simulated locations data - in a real app, this would come from an API
const LOCATIONS: Location[] = [
  { city: 'New York', airport: 'John F. Kennedy Intl', code: 'JFK', country: 'United States' },
  { city: 'Los Angeles', airport: 'Los Angeles Intl', code: 'LAX', country: 'United States' },
  { city: 'London', airport: 'Heathrow', code: 'LHR', country: 'United Kingdom' },
  { city: 'Paris', airport: 'Charles de Gaulle', code: 'CDG', country: 'France' },
  { city: 'Tokyo', airport: 'Narita Intl', code: 'NRT', country: 'Japan' },
  { city: 'Dubai', airport: 'Dubai Intl', code: 'DXB', country: 'UAE' },
  { city: 'Singapore', airport: 'Changi', code: 'SIN', country: 'Singapore' },
  { city: 'Hong Kong', airport: 'Hong Kong Intl', code: 'HKG', country: 'China' },
  { city: 'Sydney', airport: 'Kingsford Smith', code: 'SYD', country: 'Australia' },
  { city: 'Toronto', airport: 'Pearson Intl', code: 'YYZ', country: 'Canada' },
];

interface LocationAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  excludeLocation?: string; // To exclude a location from suggestions (e.g., departure location in arrival field)
}

export default function LocationAutocomplete({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  excludeLocation,
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.length > 1) {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const filtered = LOCATIONS.filter(location => {
          const matchesSearch = (
            location.city.toLowerCase().includes(inputValue.toLowerCase()) ||
            location.airport?.toLowerCase().includes(inputValue.toLowerCase()) ||
            location.code?.toLowerCase().includes(inputValue.toLowerCase())
          );
          const notExcluded = !excludeLocation || 
            !location.city.toLowerCase().includes(excludeLocation.toLowerCase());
          return matchesSearch && notExcluded;
        });
        setSuggestions(filtered);
        setIsOpen(true);
        setLoading(false);
      }, 300);
    } else {
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  const handleSelectLocation = (location: Location) => {
    onChange(location.city);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative input-group">
        <MapPin className="input-icon" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          className="travel-input"
          onFocus={() => value.length > 1 && setIsOpen(true)}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader className="w-4 h-4 text-gray-400 animate-spin" />
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {suggestions.map((location, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectLocation(location)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            >
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {location.city}
                    {location.code && (
                      <span className="ml-2 text-xs text-gray-500">
                        {location.code}
                      </span>
                    )}
                  </div>
                  {location.airport && (
                    <div className="text-xs text-gray-500">
                      {location.airport}, {location.country}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}