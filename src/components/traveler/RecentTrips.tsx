import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface Trip {
  id: string;
  destination: string;
  dates: string;
  purpose: string;
  status: string;
  cost: number;
}

interface RecentTripsProps {
  trips: Trip[];
}

export default function RecentTrips({ trips }: RecentTripsProps) {
  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <div key={trip.id} className="p-4 bg-gray-50 dark:bg-dark-primary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{trip.destination}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{trip.dates}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              ${trip.cost.toLocaleString()}
            </span>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">{trip.purpose}</span>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}