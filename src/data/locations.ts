export interface Location {
  city: string;
  state?: string;
  country: string;
  airport?: {
    code: string;
    name: string;
  };
  image: string;
}

export const LOCATIONS: Record<string, Location> = {
  'New York': {
    city: 'New York',
    state: 'NY',
    country: 'United States',
    airport: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport'
    },
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&h=250'
  },
  'San Francisco': {
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    airport: {
      code: 'SFO',
      name: 'San Francisco International Airport'
    },
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&h=250'
  },
  'London': {
    city: 'London',
    country: 'United Kingdom',
    airport: {
      code: 'LHR',
      name: 'London Heathrow Airport'
    },
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&h=250'
  },
  'Tokyo': {
    city: 'Tokyo',
    country: 'Japan',
    airport: {
      code: 'HND',
      name: 'Tokyo Haneda Airport'
    },
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&h=250'
  },
  'Singapore': {
    city: 'Singapore',
    country: 'Singapore',
    airport: {
      code: 'SIN',
      name: 'Singapore Changi Airport'
    },
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=400&h=250'
  }
};