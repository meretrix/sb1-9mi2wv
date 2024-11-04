import React from 'react';
import { Plane, Building2, Car, Clock, MapPin } from 'lucide-react';

interface TimelineSegmentProps {
  segment: {
    id: string;
    type: string;
    from: string;
    to?: string;
    datetime: string;
    status: string;
  };
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function TimelineSegment({
  segment,
  isFirst,
  isLast,
  isSelected,
  onClick
}: TimelineSegmentProps) {
  const getIcon = () => {
    switch (segment.type) {
      case 'air':
        return <Plane className="w-4 h-4" />;
      case 'lodging':
        return <Building2 className="w-4 h-4" />;
      case 'ground':
        return <Car className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (segment.type) {
      case 'air':
        return 'Flight';
      case 'lodging':
        return 'Hotel Stay';
      case 'ground':
        return 'Ground Transport';
      default:
        return 'Segment';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left relative flex items-start p-4 rounded-lg transition-all duration-200 ${
        isSelected 
          ? 'bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500/50 dark:ring-blue-400/50' 
          : 'hover:bg-gray-50 dark:hover:bg-dark-primary'
      }`}
    >
      {/* Timeline connector lines */}
      {!isFirst && (
        <div className="absolute top-0 left-[1.55rem] w-0.5 h-4 -mt-4 bg-gray-200 dark:bg-dark-primary" />
      )}
      {!isLast && (
        <div className="absolute bottom-0 left-[1.55rem] w-0.5 h-4 -mb-4 bg-gray-200 dark:bg-dark-primary" />
      )}

      {/* Icon */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
        isSelected 
          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
          : 'bg-gray-100 dark:bg-dark-primary text-gray-600 dark:text-gray-400'
      }`}>
        {getIcon()}
      </div>

      {/* Content */}
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium truncate transition-colors ${
            isSelected 
              ? 'text-blue-900 dark:text-blue-100' 
              : 'text-gray-900 dark:text-white'
          }`}>
            {getTitle()}
          </p>
        </div>

        <div className="mt-1 flex items-center text-sm space-x-1">
          <MapPin className={`w-4 h-4 flex-shrink-0 transition-colors ${
            isSelected 
              ? 'text-blue-500 dark:text-blue-400' 
              : 'text-gray-400 dark:text-gray-500'
          }`} />
          <span className={`truncate transition-colors ${
            isSelected 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {segment.from}
            {segment.to && ` → ${segment.to}`}
          </span>
        </div>

        <div className="mt-1 flex items-center text-sm space-x-1">
          <Clock className={`w-4 h-4 flex-shrink-0 transition-colors ${
            isSelected 
              ? 'text-blue-500 dark:text-blue-400' 
              : 'text-gray-400 dark:text-gray-500'
          }`} />
          <span className={`transition-colors ${
            isSelected 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {new Date(segment.datetime).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>

        <div className={`mt-1 text-sm font-medium transition-colors ${
          isSelected 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {segment.status}
        </div>
      </div>
    </button>
  );
}