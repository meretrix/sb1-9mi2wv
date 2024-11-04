import { Hotel } from '../types/hotels';

export const hotelData: Record<string, Hotel> = {
  'default': {
    id: 'HTL-001',
    name: 'Hilton San Francisco',
    type: 'Business Hotel',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&h=900',
    location: 'Financial District, San Francisco',
    address: '333 O\'Farrell Street, San Francisco, CA 94102',
    coordinates: [-122.4103, 37.7857],
    phone: '+1 (415) 555-0123',
    checkInTime: '3:00 PM',
    checkOutTime: '12:00 PM',
    rates: {
      standard: 299,
      flexible: 349
    },
    rooms: {
      'King': {
        type: 'King Room',
        description: 'Spacious room with king-size bed and city view',
        amenities: ['Wi-Fi', 'Mini Bar', 'Work Desk', 'Smart TV'],
        maxOccupancy: 2,
        bedType: 'King',
        rate: 299
      },
      'Double Queen': {
        type: 'Double Queen Room',
        description: 'Comfortable room with two queen-size beds',
        amenities: ['Wi-Fi', 'Mini Bar', 'Work Desk', 'Smart TV'],
        maxOccupancy: 4,
        bedType: 'Queen',
        rate: 349
      }
    },
    amenities: [
      'Free Wi-Fi',
      'Restaurant',
      'Fitness Center',
      'Business Center',
      'Room Service',
      'Concierge',
      'Parking',
      'Pool'
    ]
  },
  'HTL-002': {
    id: 'HTL-002',
    name: 'Marriott Downtown',
    type: 'Luxury Hotel',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&h=900',
    location: 'Downtown, New York',
    address: '85 West Street, New York, NY 10006',
    coordinates: [-74.0150, 40.7094],
    phone: '+1 (212) 555-0123',
    checkInTime: '4:00 PM',
    checkOutTime: '11:00 AM',
    rates: {
      standard: 399,
      flexible: 449
    },
    rooms: {
      'Executive King': {
        type: 'Executive King Room',
        description: 'Luxurious room with king-size bed and harbor view',
        amenities: ['Wi-Fi', 'Mini Bar', 'Work Desk', 'Smart TV', 'Lounge Access'],
        maxOccupancy: 2,
        bedType: 'King',
        rate: 399
      },
      'Club Level': {
        type: 'Club Level Room',
        description: 'Premium room with club lounge access',
        amenities: ['Wi-Fi', 'Mini Bar', 'Work Desk', 'Smart TV', 'Lounge Access', 'Butler Service'],
        maxOccupancy: 2,
        bedType: 'King',
        rate: 499
      }
    },
    amenities: [
      'Free Wi-Fi',
      'Fine Dining Restaurant',
      'Executive Lounge',
      'Spa',
      'Fitness Center',
      'Business Center',
      'Valet Parking',
      'Indoor Pool'
    ]
  }
};