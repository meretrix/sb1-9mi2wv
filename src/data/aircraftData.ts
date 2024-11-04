export interface Aircraft {
  model: string;
  manufacturer: string;
  type: string;
  seats: {
    firstClass?: number;
    businessClass?: number;
    premiumEconomy?: number;
    economy: number;
  };
  specifications: {
    length: string;
    wingspan: string;
    height: string;
    cruisingSpeed: string;
    maxAltitude: string;
    range: string;
    enteredService: string;
  };
  image: string;
}

export const aircraftData: Record<string, Aircraft> = {
  'B737-800': {
    model: 'Boeing 737-800',
    manufacturer: 'Boeing',
    type: 'Narrow-body',
    seats: {
      businessClass: 16,
      economy: 144
    },
    specifications: {
      length: '39.5m',
      wingspan: '35.9m',
      height: '12.5m',
      cruisingSpeed: '842 km/h',
      maxAltitude: '41,000 ft',
      range: '5,765 km',
      enteredService: '1998'
    },
    image: 'https://images.unsplash.com/photo-1554677439-7f0336419df3?auto=format&fit=crop&w=1600&h=900'
  },
  'A320': {
    model: 'Airbus A320',
    manufacturer: 'Airbus',
    type: 'Narrow-body',
    seats: {
      businessClass: 12,
      economy: 138
    },
    specifications: {
      length: '37.6m',
      wingspan: '35.8m',
      height: '11.8m',
      cruisingSpeed: '828 km/h',
      maxAltitude: '39,000 ft',
      range: '6,150 km',
      enteredService: '1988'
    },
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1600&h=900'
  },
  'B787-9': {
    model: 'Boeing 787-9 Dreamliner',
    manufacturer: 'Boeing',
    type: 'Wide-body',
    seats: {
      businessClass: 48,
      premiumEconomy: 88,
      economy: 116
    },
    specifications: {
      length: '63m',
      wingspan: '60m',
      height: '17m',
      cruisingSpeed: '903 km/h',
      maxAltitude: '43,000 ft',
      range: '14,140 km',
      enteredService: '2014'
    },
    image: 'https://images.unsplash.com/photo-1608023136037-626dad6c6188?auto=format&fit=crop&w=1600&h=900'
  },
  'A350-900': {
    model: 'Airbus A350-900',
    manufacturer: 'Airbus',
    type: 'Wide-body',
    seats: {
      firstClass: 8,
      businessClass: 32,
      premiumEconomy: 48,
      economy: 208
    },
    specifications: {
      length: '66.8m',
      wingspan: '64.75m',
      height: '17.05m',
      cruisingSpeed: '903 km/h',
      maxAltitude: '43,000 ft',
      range: '15,000 km',
      enteredService: '2015'
    },
    image: 'https://images.unsplash.com/photo-1592321675774-3de57f3ee0dc?auto=format&fit=crop&w=1600&h=900'
  }
};