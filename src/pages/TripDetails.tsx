import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockTrips } from '../data/mockTrips';
import { aircraftData } from '../data/aircraftData';
import { hotelData } from '../data/hotelData';
import { carData } from '../data/carData';
import TimelineSegment from '../components/TimelineSegment';
import FlightDetails from '../components/FlightDetails';
import HotelDetails from '../components/HotelDetails';
import CarDetails from '../components/CarDetails';
import CostOverview from '../components/CostOverview';
import TravelerInfoCard from '../components/TravelerInfoCard';

function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedSegment, setSelectedSegment] = useState('overview');
  
  const trip = mockTrips.find(t => t.id === id);
  
  if (!trip) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trip not found</h2>
      </div>
    );
  }

  const renderSegmentDetails = () => {
    if (selectedSegment === 'overview') {
      return <CostOverview trip={trip} />;
    }

    const segment = trip.segments.find(s => s.id === selectedSegment);
    if (!segment) return null;

    switch (segment.type) {
      case 'air':
        return (
          <FlightDetails 
            segment={segment} 
            aircraft={aircraftData[segment.details?.aircraft || 'B737-800']} 
          />
        );
      case 'lodging':
        return (
          <HotelDetails 
            segment={segment}
            hotel={segment.hotelId ? hotelData[segment.hotelId] : hotelData['default']}
          />
        );
      case 'ground':
        return (
          <CarDetails 
            segment={segment}
            car={segment.carId ? carData[segment.carId] : carData['default']}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Trip Header */}
      <div 
        className="relative h-48 rounded-lg overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${trip.destinationImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60">
          <div className="h-full flex items-end">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-white dark:text-gray-100">{trip.destination}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                trip.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                trip.status === 'upcoming' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              }`}>
                {trip.status}
              </span>
              <p className="text-lg text-white dark:text-gray-100">{trip.purpose}</p>
              <p className="text-sm mt-1 text-gray-100 dark:text-gray-300">
                {new Date(trip.dates.start).toLocaleDateString()} - {new Date(trip.dates.end).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Traveler Info */}
      <TravelerInfoCard 
        traveler={trip.traveler}
        documents={trip.documents}
        status={trip.segments.some(s => s.status === 'pending') ? 'pending' : 'confirmed'}
      />

      {/* Timeline and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
          <div>
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Trip Timeline</h2>
            </div>
            <div className="p-6">
              <button
                onClick={() => setSelectedSegment('overview')}
                className={`w-full text-left relative flex items-start space-x-4 p-4 rounded-lg transition-colors duration-200 ${
                  selectedSegment === 'overview' ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-dark-primary'
                }`}
              >
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  selectedSegment === 'overview' ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-gray-100 dark:bg-dark-primary'
                }`}>
                  <span className={selectedSegment === 'overview' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}>
                    $
                  </span>
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    selectedSegment === 'overview' ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                  }`}>
                    Cost Overview
                  </p>
                  <p className={`text-sm ${
                    selectedSegment === 'overview' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    View trip expenses and breakdown
                  </p>
                </div>
              </button>

              {trip.segments.map((segment, index) => (
                <TimelineSegment
                  key={segment.id}
                  segment={segment}
                  isFirst={index === 0}
                  isLast={index === trip.segments.length - 1}
                  isSelected={selectedSegment === segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Segment Details */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary h-full">
            <div>
              <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {selectedSegment === 'overview' ? 'Cost Overview' : 'Segment Details'}
                </h2>
              </div>
              <div className="p-6">
                {renderSegmentDetails()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;