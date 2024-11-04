import { Trip, TripSegment, TripStatus } from '../types/trips';

export const mockTrips: Trip[] = [
  {
    id: 'TRIP-00001',
    purpose: 'Q4 Sales Conference',
    destination: 'San Francisco',
    status: 'upcoming' as TripStatus,
    dates: {
      start: '2024-04-15',
      end: '2024-04-18'
    },
    traveler: {
      id: 'EMP-123',
      name: 'Sarah Chen',
      department: 'Sales',
      email: 'sarah.chen@company.com'
    },
    segments: [
      {
        id: 'SEG-001',
        type: 'ground',
        subtype: 'taxi',
        from: 'Home',
        to: 'JFK Airport',
        datetime: '2024-04-15T06:30:00',
        confirmationNumber: 'UBER-X123456',
        status: 'confirmed'
      },
      {
        id: 'SEG-002',
        type: 'air',
        subtype: 'flight',
        from: 'JFK',
        to: 'SFO',
        datetime: '2024-04-15T09:00:00',
        confirmationNumber: 'UA123',
        recordLocator: 'ABC123',
        status: 'confirmed',
        details: {
          airline: 'United Airlines',
          flightNumber: 'UA 123',
          seat: '12A',
          class: 'Economy Plus',
          aircraft: 'B737-800'
        }
      },
      {
        id: 'SEG-003',
        type: 'ground',
        subtype: 'taxi',
        from: 'SFO Airport',
        to: 'Hilton SF',
        datetime: '2024-04-15T12:30:00',
        confirmationNumber: 'LYFT-789012',
        status: 'confirmed'
      },
      {
        id: 'SEG-004',
        type: 'lodging',
        subtype: 'hotel',
        from: 'Hilton San Francisco',
        datetime: '2024-04-15T15:00:00',
        confirmationNumber: 'HH456789',
        status: 'confirmed',
        details: {
          nights: 3,
          roomType: 'King',
          checkIn: '2024-04-15',
          checkOut: '2024-04-18'
        },
        hotelId: 'HTL-001'
      }
    ],
    documents: [
      {
        id: 'DOC-001',
        type: 'itinerary',
        name: 'Complete Itinerary',
        url: '#'
      },
      {
        id: 'DOC-002',
        type: 'policy',
        name: 'Travel Policy Summary',
        url: '#'
      },
      {
        id: 'DOC-003',
        type: 'receipt',
        name: 'Hotel Confirmation',
        url: '#'
      }
    ],
    notes: [
      {
        id: 'NOTE-001',
        date: '2024-03-01T10:00:00',
        author: 'Travel Desk',
        content: 'Booking completed according to travel policy guidelines.'
      }
    ],
    destinationImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&h=1000'
  },
  {
    id: 'TRIP-00002',
    purpose: 'Tech Summit 2024',
    destination: 'Singapore',
    status: 'upcoming' as TripStatus,
    dates: {
      start: '2024-05-10',
      end: '2024-05-15'
    },
    traveler: {
      id: 'EMP-124',
      name: 'Michael Chen',
      department: 'Engineering',
      email: 'michael.chen@company.com'
    },
    segments: [
      {
        id: 'SEG-005',
        type: 'air',
        subtype: 'flight',
        from: 'SFO',
        to: 'SIN',
        datetime: '2024-05-10T23:30:00',
        confirmationNumber: 'SQ123',
        recordLocator: 'XYZ789',
        status: 'confirmed',
        details: {
          airline: 'Singapore Airlines',
          flightNumber: 'SQ 123',
          seat: '15K',
          class: 'Business',
          aircraft: 'A350-900'
        }
      },
      {
        id: 'SEG-006',
        type: 'lodging',
        subtype: 'hotel',
        from: 'Marina Bay Sands',
        datetime: '2024-05-11T15:00:00',
        confirmationNumber: 'MBS789012',
        status: 'confirmed',
        details: {
          nights: 4,
          roomType: 'Deluxe',
          checkIn: '2024-05-11',
          checkOut: '2024-05-15'
        },
        hotelId: 'HTL-002'
      }
    ],
    documents: [
      {
        id: 'DOC-004',
        type: 'itinerary',
        name: 'Complete Itinerary',
        url: '#'
      },
      {
        id: 'DOC-005',
        type: 'visa',
        name: 'Singapore Visa',
        url: '#'
      }
    ],
    notes: [
      {
        id: 'NOTE-002',
        date: '2024-04-01T14:30:00',
        author: 'Travel Desk',
        content: 'Business class approved for long-haul flight.'
      }
    ],
    destinationImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2000&h=1000'
  },
  {
    id: 'TRIP-00003',
    purpose: 'Client Meetings',
    destination: 'London',
    status: 'active' as TripStatus,
    dates: {
      start: '2024-03-20',
      end: '2024-03-25'
    },
    traveler: {
      id: 'EMP-125',
      name: 'Emma Thompson',
      department: 'Sales',
      email: 'emma.t@company.com'
    },
    segments: [
      {
        id: 'SEG-007',
        type: 'air',
        subtype: 'flight',
        from: 'JFK',
        to: 'LHR',
        datetime: '2024-03-20T19:30:00',
        confirmationNumber: 'BA456',
        recordLocator: 'DEF456',
        status: 'confirmed',
        details: {
          airline: 'British Airways',
          flightNumber: 'BA 456',
          seat: '4F',
          class: 'Business',
          aircraft: 'B787-9'
        }
      },
      {
        id: 'SEG-008',
        type: 'lodging',
        subtype: 'hotel',
        from: 'The Savoy',
        datetime: '2024-03-21T14:00:00',
        confirmationNumber: 'SAV345678',
        status: 'confirmed',
        details: {
          nights: 4,
          roomType: 'Executive Suite',
          checkIn: '2024-03-21',
          checkOut: '2024-03-25'
        },
        hotelId: 'HTL-001'
      }
    ],
    documents: [
      {
        id: 'DOC-006',
        type: 'itinerary',
        name: 'Complete Itinerary',
        url: '#'
      }
    ],
    notes: [],
    destinationImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&h=1000'
  },
  {
    id: 'TRIP-00004',
    purpose: 'Annual Marketing Conference',
    destination: 'Tokyo',
    status: 'completed' as TripStatus,
    dates: {
      start: '2024-02-15',
      end: '2024-02-20'
    },
    traveler: {
      id: 'EMP-126',
      name: 'David Kim',
      department: 'Marketing',
      email: 'david.k@company.com'
    },
    segments: [
      {
        id: 'SEG-009',
        type: 'air',
        subtype: 'flight',
        from: 'LAX',
        to: 'NRT',
        datetime: '2024-02-15T11:30:00',
        confirmationNumber: 'NH789',
        recordLocator: 'GHI789',
        status: 'completed',
        details: {
          airline: 'ANA',
          flightNumber: 'NH 789',
          seat: '7A',
          class: 'Business',
          aircraft: 'B787-9'
        }
      },
      {
        id: 'SEG-010',
        type: 'lodging',
        subtype: 'hotel',
        from: 'Park Hyatt Tokyo',
        datetime: '2024-02-16T15:00:00',
        confirmationNumber: 'PHT234567',
        status: 'completed',
        details: {
          nights: 4,
          roomType: 'Park View Room',
          checkIn: '2024-02-16',
          checkOut: '2024-02-20'
        },
        hotelId: 'HTL-002'
      }
    ],
    documents: [
      {
        id: 'DOC-007',
        type: 'itinerary',
        name: 'Complete Itinerary',
        url: '#'
      },
      {
        id: 'DOC-008',
        type: 'receipt',
        name: 'Expense Report',
        url: '#'
      }
    ],
    notes: [
      {
        id: 'NOTE-003',
        date: '2024-02-21T09:00:00',
        author: 'Travel Desk',
        content: 'Trip completed successfully. All expenses submitted.'
      }
    ],
    destinationImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2000&h=1000'
  }
];