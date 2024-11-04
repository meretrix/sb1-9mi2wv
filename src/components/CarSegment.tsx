import React from 'react';
import { 
  Car, Calendar, Clock, Users, Fuel,
  Gauge, Box, Shield, CreditCard, MapPin,
  ChevronRight
} from 'lucide-react';
import { CarRental } from '../types/cars';
import { carData } from '../data/carData';

interface CarSegmentProps {
  car: CarRental;
}

export default function CarSegment({ car }: CarSegmentProps) {
  const features = [
    { icon: Users, label: `${car.passengers} Passengers` },
    { icon: Box, label: `${car.luggage} Luggage` },
    { icon: Gauge, label: car.transmission },
    { icon: Fuel, label: car.fuelType }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-64 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{car.make} {car.model}</h3>
            <p className="text-sm text-gray-500">{car.category} or similar</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Daily Rate</p>
            <p className="text-lg font-semibold text-gray-900">${car.rate}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-600">
              <feature.icon className="w-4 h-4" />
              <span className="text-sm">{feature.label}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Features & Amenities</h4>
          <div className="grid grid-cols-2 gap-3">
            {car.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Insurance Coverage</h4>
          <div className="space-y-3">
            {car.insurance.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className={`w-4 h-4 ${
                    item.included ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className={`text-sm ${
                  item.included ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {item.included ? 'Included' : 'Optional'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}