import React from 'react';
import { 
  Plane, Clock, Ruler, Mountain, Calendar,
  Wifi, Coffee, Utensils, Tv, ChevronRight,
  Armchair
} from 'lucide-react';
import { Aircraft } from '../data/aircraftData';
import FlightMap from './FlightMap';

interface FlightDetailsProps {
  segment: any;
  aircraft: Aircraft;
}

const AIRPORT_COORDS: Record<string, [number, number]> = {
  'JFK': [-73.7781, 40.6413],
  'SFO': [-122.3750, 37.6213],
  'LAX': [-118.4085, 33.9416],
  'LHR': [-0.4543, 51.4700],
  'CDG': [2.5479, 49.0097],
  'NRT': [140.3929, 35.7720],
  'SIN': [103.9915, 1.3644],
  'HKG': [113.9145, 22.3088],
  'DXB': [55.3644, 25.2532]
};

export default function FlightDetails({ segment, aircraft }: FlightDetailsProps) {
  const amenities = [
    { icon: Wifi, label: 'Wi-Fi Available' },
    { icon: Coffee, label: 'Complimentary Drinks' },
    { icon: Utensils, label: 'Meal Service' },
    { icon: Tv, label: 'In-flight Entertainment' }
  ];

  const originCoords = AIRPORT_COORDS[segment.from] || [-73.7781, 40.6413];
  const destCoords = AIRPORT_COORDS[segment.to] || [-122.3750, 37.6213];

  return (
    <div className="space-y-6">
      {/* Flight Route Map */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Flight Route</h3>
        </div>
        <div className="h-[300px]">
          <FlightMap
            origin={originCoords}
            destination={destCoords}
            className="h-full"
          />
        </div>
      </div>

      {/* Cabin and Seating */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cabin & Seating</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Your Seat</h4>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Armchair className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{segment.details?.seat || 'Not Assigned'}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{segment.details?.class || 'Economy'}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Cabin Configuration</h4>
              <div className="space-y-2">
                {aircraft.seats.firstClass && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">First Class</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{aircraft.seats.firstClass} seats</span>
                  </div>
                )}
                {aircraft.seats.businessClass && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Business Class</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{aircraft.seats.businessClass} seats</span>
                  </div>
                )}
                {aircraft.seats.premiumEconomy && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Premium Economy</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{aircraft.seats.premiumEconomy} seats</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Economy</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{aircraft.seats.economy} seats</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Amenities</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <amenity.icon className="w-4 h-4" />
                  <span className="text-sm">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Aircraft Details */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Aircraft Information</h3>
        </div>
        <div>
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={aircraft.image}
              alt={aircraft.model}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{aircraft.model}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{aircraft.manufacturer} · {aircraft.type}</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Entered Service: {aircraft.specifications.enteredService}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Length: {aircraft.specifications.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Wingspan: {aircraft.specifications.wingspan}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mountain className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Max Altitude: {aircraft.specifications.maxAltitude}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cruising Speed: {aircraft.specifications.cruisingSpeed}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Range: {aircraft.specifications.range}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Height: {aircraft.specifications.height}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}