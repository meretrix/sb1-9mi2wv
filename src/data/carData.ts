import { CarRental } from '../types/cars';

export const carData: Record<string, CarRental> = {
  'default': {
    id: 'CAR-001',
    make: 'Toyota',
    model: 'Camry',
    category: 'Intermediate',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1600&h=900',
    passengers: 5,
    luggage: 3,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    rate: 59,
    features: [
      'Bluetooth',
      'Backup Camera',
      'Cruise Control',
      'USB Ports',
      'Apple CarPlay/Android Auto'
    ],
    insurance: [
      { name: 'Collision Damage Waiver', included: true },
      { name: 'Third Party Liability', included: true },
      { name: 'Theft Protection', included: true },
      { name: 'Personal Accident Insurance', included: false }
    ]
  },
  'CAR-002': {
    id: 'CAR-002',
    make: 'BMW',
    model: '5 Series',
    category: 'Luxury',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=1600&h=900',
    passengers: 5,
    luggage: 4,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    rate: 89,
    features: [
      'Leather Seats',
      'Navigation System',
      'Premium Sound System',
      'Parking Sensors',
      'Wireless Charging'
    ],
    insurance: [
      { name: 'Collision Damage Waiver', included: true },
      { name: 'Third Party Liability', included: true },
      { name: 'Theft Protection', included: true },
      { name: 'Personal Accident Insurance', included: true }
    ]
  }
};