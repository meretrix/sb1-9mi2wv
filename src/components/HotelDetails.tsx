import React from 'react';
import { 
  Building2, Calendar, Clock, Wifi, Coffee, Tv,
  Utensils, Car, Waves, Dumbbell, MapPin, Phone,
  Mail, Star, ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import { Hotel } from '../types/hotels';
import { hotelData } from '../data/hotelData';

interface HotelDetailsProps {
  segment: any;
  hotel?: Hotel;
}

export default function HotelDetails({ segment }: HotelDetailsProps) {
  const hotel = segment.hotelId ? hotelData[segment.hotelId] : hotelData['default'];

  if (!hotel || !segment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Hotel details not available</p>
      </div>
    );
  }

  const amenities = [
    { icon: Wifi, label: 'Free Wi-Fi' },
    { icon: Coffee, label: 'Breakfast Included' },
    { icon: Utensils, label: 'Restaurant' },
    { icon: Car, label: 'Parking' },
    { icon: Waves, label: 'Swimming Pool' },
    { icon: Dumbbell, label: 'Fitness Center' }
  ];

  const getCheckoutDate = () => {
    const checkinDate = new Date(segment.datetime);
    const nights = segment.details?.nights || 1;
    const checkoutDate = new Date(checkinDate);
    checkoutDate.setDate(checkinDate.getDate() + nights);
    return checkoutDate;
  };

  return (
    <div className="space-y-6">
      {/* Hotel Overview */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{hotel.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[...Array(hotel.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{hotel.type}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Per Night</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">${hotel.rates.standard}</p>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {hotel.location}
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {hotel.phone}
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Details */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reservation Details</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Check-in</h4>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {format(new Date(segment.datetime), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">After {hotel.checkInTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Check-out</h4>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {format(getCheckoutDate(), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Before {hotel.checkOutTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Room Details</h4>
            <div className="bg-gray-50 dark:bg-dark-primary rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{segment.details?.roomType || 'Standard Room'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {hotel.rooms[segment.details?.roomType || 'King']?.description || 'Comfortable room with modern amenities'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {segment.details?.nights || 1} night{segment.details?.nights !== 1 ? 's' : ''} · 
                    ${hotel.rates.standard * (segment.details?.nights || 1)} total
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Hotel Amenities</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <amenity.icon className="w-4 h-4" />
                <span className="text-sm">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Map */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Location</h3>
        </div>
        <div className="p-6">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-s+3B82F6(${hotel.coordinates[0]},${hotel.coordinates[1]})/${hotel.coordinates[0]},${hotel.coordinates[1]},14/800x400@2x?access_token=pk.eyJ1IjoibWVyZXRyaXgiLCJhIjoiY20yeHB1d292MDdiZzJrcHg1ZDVqamVscCJ9.GZP8JbxHS2cGWuYaX3GiQQ`}
              alt="Hotel location map"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{hotel.address}</p>
        </div>
      </div>
    </div>
  );
}