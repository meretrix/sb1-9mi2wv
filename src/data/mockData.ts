import { addDays } from 'date-fns';
import { LOCATIONS } from './locations';

export interface TripSegment {
  type: 'flight' | 'hotel' | 'car';
  confirmationCode: string;
  details: string;
}

export interface Traveler {
  id: string;
  name: string;
  avatar: string;
  email: string;
  department: string;
}

export interface Trip {
  id: string;
  traveler: Traveler;
  destination: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'upcoming' | 'completed';
  totalCost: number;
  policyCompliance: boolean;
  segments: TripSegment[];
}

const MOCK_TRAVELERS: Traveler[] = [
  {
    id: 'T001',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    email: 'sarah.chen@company.com',
    department: 'Sales'
  },
  {
    id: 'T002',
    name: 'Michael Rodriguez',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    email: 'michael.r@company.com',
    department: 'Engineering'
  },
  {
    id: 'T003',
    name: 'Emma Thompson',
    avatar: 'https://i.pravatar.cc/150?u=emma',
    email: 'emma.t@company.com',
    department: 'Marketing'
  }
];

const DESTINATIONS = Object.keys(LOCATIONS);

export function generateInitialTrips(): Trip[] {
  const trips: Trip[] = [];
  const now = new Date();

  // Generate 30 trips
  for (let i = 0; i < 30; i++) {
    const startOffset = Math.floor(Math.random() * 60) - 30; // -30 to +30 days
    const duration = Math.floor(Math.random() * 7) + 2; // 2-9 days
    const startDate = addDays(now, startOffset);
    const endDate = addDays(startDate, duration);
    
    const status = startOffset < 0 && (startOffset + duration) < 0 ? 'completed' :
                  startOffset > 0 ? 'upcoming' : 'active';

    trips.push({
      id: `TRIP-${String(i + 1).padStart(5, '0')}`,
      traveler: MOCK_TRAVELERS[Math.floor(Math.random() * MOCK_TRAVELERS.length)],
      destination: DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)],
      startDate,
      endDate,
      status,
      totalCost: Math.floor(Math.random() * 5000) + 1000,
      policyCompliance: Math.random() > 0.15,
      segments: [
        {
          type: 'flight',
          confirmationCode: `FL${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          details: 'Outbound Flight'
        },
        {
          type: 'hotel',
          confirmationCode: `HT${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          details: 'Hotel Stay'
        },
        {
          type: 'flight',
          confirmationCode: `FL${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          details: 'Return Flight'
        }
      ]
    });
  }

  return trips.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}