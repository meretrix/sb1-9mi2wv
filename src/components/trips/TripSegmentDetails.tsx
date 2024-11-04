import React from 'react';
import { 
  Plane, Building, Car, Clock, MapPin, 
  CreditCard, AlertTriangle, Users, Wifi,
  Coffee, Utensils, Suitcase
} from 'lucide-react';

interface TripSegmentDetailsProps {
  segment: any;
}

export default function TripSegmentDetails({ segment }: TripSegmentDetailsProps) {
  const renderFlightDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Departure</h4>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-500">{segment.details.departure.airport}</p>
            <p className="text-sm text-gray-500">Terminal {segment.details.departure.terminal}</p>
            <p className="text-sm text-gray-500">Gate {segment.details.departure.gate}</p>
            <p className="text-sm text-gray-500">
              {new Date(segment.startTime).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">Arrival</h4>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-500">{segment.details.arrival.airport}</p>
            <p className="text-sm text-gray-500">Terminal {segment.details.arrival.terminal}</p>
            <p className="text-sm text-gray-500">Gate {segment.details.arrival.gate}</p>
            <p className="text-sm text-gray-500">
              {new Date(segment.endTime).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Flight Details</h4>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-500">{segment.details.airline}</p>
              <p className="text-sm text-gray-500">Flight {segment.details.flightNumber}</p>
              <p className="text-sm text-gray-500">{segment.details.aircraft}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Seat & Baggage</h4>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-500">{segment.details.cabin} Class</p>
              <p className="text-sm text-gray-500">Seat {segment.details.seat}</p>
              <p className="text-sm text-gray-500">{segment.details.baggage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHotelDetails = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-900">Hotel Information</h4>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-500">{segment.details.hotel}</p>
          <p className="text-sm text-gray-500">{segment.details.address}</p>
          <p className="text-sm text-gray-500">{segment.details.roomType}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900">Check-in/Check-out</h4>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-500">
            Check-in: {segment.details.checkin} ({new Date(segment.startTime).toLocaleDateString()})
          </p>
          <p className="text-sm text-gray-500">
            Check-out: {segment.details.checkout} ({new Date(segment.endTime).toLocaleDateString()})
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900">Amenities</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {segment.details.amenities.map((amenity: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTransferDetails = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-900">Transfer Information</h4>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-500">Provider: {segment.details.provider}</p>
          <p className="text-sm text-gray-500">Distance: {segment.details.distance}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Pickup</h4>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-500">{segment.details.pickup}</p>
              <p className="text-sm text-gray-500">
                {new Date(segment.startTime).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Dropoff</h4>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-500">{segment.details.dropoff}</p>
              <p className="text-sm text-gray-500">
                {new Date(segment.endTime).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Segment-specific details */}
      {segment.type === 'flight' && renderFlightDetails()}
      {segment.type === 'hotel' && renderHotelDetails()}
      {segment.type === 'transfer' && renderTransferDetails()}

      {/* Common footer with booking details */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-xs text-gray-500">Confirmation Code</p>
              <p className="text-sm font-medium text-gray-900">{segment.confirmationCode}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Cost</p>
              <p className="text-sm font-medium text-gray-900">${segment.cost.toLocaleString()}</p>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View Booking Details
          </button>
        </div>
      </div>
    </div>
  );
}