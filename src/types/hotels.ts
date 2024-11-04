export interface HotelRoom {
  type: string;
  description: string;
  amenities: string[];
  maxOccupancy: number;
  bedType: string;
  rate: number;
}

export interface Hotel {
  id: string;
  name: string;
  type: string;
  rating: number;
  image: string;
  location: string;
  address: string;
  coordinates: [number, number];
  phone: string;
  checkInTime: string;
  checkOutTime: string;
  rates: {
    standard: number;
    flexible: number;
  };
  rooms: {
    [key: string]: HotelRoom;
  };
  amenities: string[];
}