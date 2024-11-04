import React from 'react';
import { 
  Car, Calendar, Clock, Users, Fuel,
  Gauge, Box, Shield, CreditCard, MapPin,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import { CarRental } from '../types/cars';

interface CarDetailsProps {
  segment: any;
  car: CarRental;
}

export default function CarDetails({ segment, car }: CarDetailsProps) {
  const features = [
    { icon: Users, label: `${car.passengers} Passengers` },
    { icon: Box, label: `${car.luggage} Luggage` },
    { icon: Gauge, label: car.transmission },
    { icon: Fuel, label: car.fuelType }
  ];

  const insuranceOptions = [
    { name: 'Collision Damage Waiver', included: true },
    { name: 'Third Party Liability', included: true },
    { name: 'Theft Protection', included: true },
    { name: 'Personal Accident Insurance', included: false }
  ];

  const getReturnDate = () => {
    if (segment.details?.returnDate) {
      return new Date(segment.details.returnDate);
    }
    const pickupDate = new Date(segment.datetime);
    return new Date(pickupDate.setDate(pickupDate.getDate() + 1));
  };

  const getDays = () => {
    const pickupDate = new Date(segment.datetime);
    const returnDate = getReturnDate();
    const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Car Overview */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={car.image}
            alt={car.model}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{car.make} {car.model}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{car.category} or similar</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Rate</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">${car.rate}/day</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <feature.icon className="w-4 h-4" />
                <span className="text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rental Details */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Rental Details</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Pickup</h4>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {format(new Date(segment.datetime), 'MMM d, yyyy')}
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1" />
                      <p className="text-sm text-blue-600 dark:text-blue-400">{format(new Date(segment.datetime), 'h:mm a')}</p>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1" />
                      <p className="text-sm text-blue-600 dark:text-blue-400">{segment.from}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Return</h4>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {format(getReturnDate(), 'MMM d, yyyy')}
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1" />
                      <p className="text-sm text-blue-600 dark:text-blue-400">{format(getReturnDate(), 'h:mm a')}</p>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1" />
                      <p className="text-sm text-blue-600 dark:text-blue-400">{segment.to || segment.from}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance & Protection */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Insurance & Protection</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {insuranceOptions.map((insurance, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className={`w-4 h-4 ${insurance.included ? 'text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{insurance.name}</span>
                </div>
                <span className={`text-sm ${insurance.included ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {insurance.included ? 'Included' : 'Optional'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Summary</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Daily Rate</span>
              <span className="font-medium text-gray-900 dark:text-white">${car.rate}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Number of Days</span>
              <span className="font-medium text-gray-900 dark:text-white">{getDays()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Insurance</span>
              <span className="font-medium text-gray-900 dark:text-white">Included</span>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-dark-primary">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">Total</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${(car.rate * getDays()).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}