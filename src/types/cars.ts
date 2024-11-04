export interface CarRental {
  id: string;
  make: string;
  model: string;
  category: string;
  year: number;
  image: string;
  passengers: number;
  luggage: number;
  transmission: string;
  fuelType: string;
  rate: number;
  features: string[];
  insurance: {
    name: string;
    included: boolean;
  }[];
}