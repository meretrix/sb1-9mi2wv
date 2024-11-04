import React from 'react';
import {
  Wifi,
  Utensils,
  Dumbbell,
  Briefcase,
  Coffee,
  User,
  Car,
  Waves,
  Clock,
  MapPin,
  Phone,
  Building2
} from 'lucide-react';
import { Hotel } from '../types/hotels';
import { MapComponent } from './MapComponent';

interface HotelSegmentProps {
  hotel: Hotel;
}

const getAmenityIcon = (amenity: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'Free Wi-Fi': <Wifi className="w-5 h-5" />,
    'Restaurant': <Utensils className="w-5 h-5" />,
    'Fitness Center': <Dumbbell className="w-5 h-5" />,
    'Business Center': <Briefcase className="w-5 h-5" />,
    'Room Service': <Coffee className="w-5 h-5" />,
    'Concierge': <User className="w-5 h-5" />,
    'Parking': <Car className="w-5 h-5" />,
    'Pool': <Waves className="w-5 h-5" />
  };
  return iconMap[amenity] || null;
};

const HotelSegment: React.FC<HotelSegmentProps> = ({ hotel }) => {
  return (
    <div className="space-y-6">
      {/* Hotel Header */}
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-2xl font-bold text-white">{hotel.name}</h3>
          <p className="text-white/90">{hotel.type}</p>
        </div>
      </div>

      {/* Hotel Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Hotel Information</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>Check-in: {hotel.checkInTime} / Check-out: {hotel.checkOutTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{hotel.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>{hotel.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gray-500" />
              <span>Rating: {hotel.rating} stars</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Location</h4>
          <div className="h-[200px] rounded-lg overflow-hidden">
            <MapComponent
              center={hotel.coordinates}
              zoom={14}
              markers={[{ position: hotel.coordinates, label: hotel.name }]}
            />
          </div>
        </div>

        {/* Room Details */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Room Details</h4>
          <div className="space-y-4">
            {Object.entries(hotel.rooms).map(([key, room]) => (
              <div key={key} className="border-b pb-4 last:border-0">
                <h5 className="font-medium">{room.type}</h5>
                <p className="text-sm text-gray-600 mt-1">{room.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm">
                  Max Occupancy: {room.maxOccupancy} • Rate: ${room.rate}/night
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Hotel Amenities</h4>
          <div className="grid grid-cols-2 gap-4">
            {hotel.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSegment;