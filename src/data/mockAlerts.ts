import { Alert } from '../types/alerts';

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Flight Cancellation - AA1234',
    message: 'Flight AA1234 from LAX to JFK has been cancelled due to severe weather conditions.',
    type: 'error',
    severity: 'high',
    time: '10 minutes ago',
    source: 'American Airlines',
    affectedTravelers: [
      'Sarah Johnson - VP Sales',
      'Michael Chen - Senior Engineer'
    ],
    relatedTrips: ['TRIP-2024-0123', 'TRIP-2024-0124'],
    links: [
      {
        title: 'Weather Advisory',
        url: 'https://weather.gov/advisory',
        type: 'external'
      },
      {
        title: 'Rebooking Options',
        url: '/trips/rebook',
        type: 'internal'
      }
    ]
  },
  {
    id: '2',
    title: 'Travel Advisory - Paris',
    message: 'Transportation strikes affecting public transit and airport operations in Paris.',
    type: 'warning',
    severity: 'medium',
    time: '1 hour ago',
    source: 'Global Security Team',
    affectedTravelers: [
      'David Miller - Sales Director',
      'Emma Wilson - Product Manager'
    ],
    links: [
      {
        title: 'Strike Updates',
        url: 'https://transport.paris/updates',
        type: 'external'
      }
    ]
  },
  {
    id: '3',
    title: 'Hotel Policy Update',
    message: 'New preferred rates available at Marriott properties worldwide.',
    type: 'info',
    severity: 'low',
    time: '2 hours ago',
    source: 'Travel Policy Team',
    links: [
      {
        title: 'View Updated Rates',
        url: '/policy/hotel-rates',
        type: 'internal'
      }
    ]
  },
  {
    id: '4',
    title: 'Passport Expiration Alert',
    message: 'Multiple travelers have passports expiring in the next 60 days.',
    type: 'warning',
    severity: 'medium',
    time: '3 hours ago',
    source: 'Compliance Team',
    affectedTravelers: [
      'John Smith - Engineering',
      'Lisa Brown - Marketing',
      'Robert Taylor - Sales'
    ]
  },
  {
    id: '5',
    title: 'System Maintenance',
    message: 'Scheduled maintenance window for booking system on Saturday 2AM-4AM EST.',
    type: 'info',
    severity: 'low',
    time: '4 hours ago',
    source: 'IT Operations',
    links: [
      {
        title: 'Maintenance Details',
        url: '/system/maintenance',
        type: 'internal'
      }
    ]
  }
];