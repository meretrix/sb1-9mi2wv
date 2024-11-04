import React, { useState } from 'react';
import { 
  Plane, Hotel, Car, Calendar, Users,
  Search, Clock, Briefcase, CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';
import LocationAutocomplete from '../components/LocationAutocomplete';
import TravelInput from '../components/TravelInput';
import TravelSelect from '../components/TravelSelect';
import RadioGroup from '../components/RadioGroup';

type TripType = 'oneway' | 'roundtrip';
type BookingType = 'flight' | 'hotel' | 'car';

interface FormData {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  cabinClass: string;
  passengers: string;
}

const tripTypes = [
  { value: 'oneway', label: 'One Way' },
  { value: 'roundtrip', label: 'Round Trip' },
];

const cabinClasses = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First Class' },
];

const passengerOptions = [
  { value: '1', label: '1 Passenger' },
  { value: '2', label: '2 Passengers' },
  { value: '3', label: '3 Passengers' },
  { value: '4', label: '4 Passengers' },
  { value: '5', label: '5 Passengers' },
  { value: '6', label: '6 Passengers' },
];

const roomOptions = [
  { value: '1', label: '1 Room' },
  { value: '2', label: '2 Rooms' },
  { value: '3', label: '3 Rooms' },
  { value: '4', label: '4 Rooms' },
];

function BookTravel() {
  const [bookingType, setBookingType] = useState<BookingType>('flight');
  const [tripType, setTripType] = useState<TripType>('roundtrip');
  const [formData, setFormData] = useState<FormData>({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    cabinClass: 'economy',
    passengers: '1',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Searching for the best options...');
  };

  const renderFlightForm = () => (
    <form onSubmit={handleSearch} className="space-y-6 bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <RadioGroup
        name="tripType"
        options={tripTypes}
        value={tripType}
        onChange={(value) => setTripType(value as TripType)}
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LocationAutocomplete
          label="From"
          placeholder="Departure City or Airport"
          value={formData.from}
          onChange={(value) => setFormData({ ...formData, from: value })}
          required
        />

        <LocationAutocomplete
          label="To"
          placeholder="Arrival City or Airport"
          value={formData.to}
          onChange={(value) => setFormData({ ...formData, to: value })}
          required
          excludeLocation={formData.from}
        />

        <TravelInput
          label="Departure"
          icon={Calendar}
          type="date"
          value={formData.departDate}
          onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
          required
          min={new Date().toISOString().split('T')[0]}
        />

        {tripType === 'roundtrip' && (
          <TravelInput
            label="Return"
            icon={Calendar}
            type="date"
            value={formData.returnDate}
            onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
            required
            min={formData.departDate || new Date().toISOString().split('T')[0]}
          />
        )}
      </div>

      <div className="flex items-center space-x-6">
        <TravelSelect
          label="Passengers"
          icon={Users}
          options={passengerOptions}
          value={formData.passengers}
          onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
          className="flex-1"
        />

        <TravelSelect
          label="Cabin Class"
          icon={Briefcase}
          options={cabinClasses}
          value={formData.cabinClass}
          onChange={(e) => setFormData({ ...formData, cabinClass: e.target.value })}
          className="flex-1"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Search Flights
      </button>
    </form>
  );

  const renderHotelForm = () => (
    <form onSubmit={handleSearch} className="space-y-6 bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LocationAutocomplete
          label="Destination"
          placeholder="City or Hotel Location"
          value={formData.to}
          onChange={(value) => setFormData({ ...formData, to: value })}
          required
        />

        <TravelInput
          label="Check-in"
          icon={Calendar}
          type="date"
          required
          value={formData.departDate}
          onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
        />

        <TravelInput
          label="Check-out"
          icon={Calendar}
          type="date"
          required
          value={formData.returnDate}
          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
          min={formData.departDate || new Date().toISOString().split('T')[0]}
        />

        <div className="grid grid-cols-2 gap-4">
          <TravelSelect
            label="Rooms"
            icon={Hotel}
            options={roomOptions}
            value="1"
            onChange={() => {}}
          />
          <TravelSelect
            label="Guests"
            icon={Users}
            options={passengerOptions.map(opt => ({
              ...opt,
              label: opt.label.replace('Passenger', 'Guest')
            }))}
            value={formData.passengers}
            onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Search Hotels
      </button>
    </form>
  );

  const renderCarForm = () => (
    <form onSubmit={handleSearch} className="space-y-6 bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LocationAutocomplete
          label="Pickup Location"
          placeholder="City or Airport"
          value={formData.from}
          onChange={(value) => setFormData({ ...formData, from: value })}
          required
        />

        <LocationAutocomplete
          label="Return Location"
          placeholder="Same as pickup"
          value={formData.to}
          onChange={(value) => setFormData({ ...formData, to: value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <TravelInput
            label="Pickup Date"
            icon={Calendar}
            type="date"
            required
            value={formData.departDate}
            onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />
          <TravelSelect
            label="Pickup Time"
            icon={Clock}
            options={Array.from({ length: 24 }, (_, i) => ({
              value: i.toString(),
              label: `${i.toString().padStart(2, '0')}:00`,
            }))}
            value="12"
            onChange={() => {}}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TravelInput
            label="Return Date"
            icon={Calendar}
            type="date"
            required
            value={formData.returnDate}
            onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
            min={formData.departDate || new Date().toISOString().split('T')[0]}
          />
          <TravelSelect
            label="Return Time"
            icon={Clock}
            options={Array.from({ length: 24 }, (_, i) => ({
              value: i.toString(),
              label: `${i.toString().padStart(2, '0')}:00`,
            }))}
            value="12"
            onChange={() => {}}
          />
        </div>
      </div>

      <TravelSelect
        label="Vehicle Type"
        icon={Car}
        options={[
          { value: 'economy', label: 'Economy' },
          { value: 'compact', label: 'Compact' },
          { value: 'midsize', label: 'Midsize' },
          { value: 'fullsize', label: 'Full Size' },
          { value: 'suv', label: 'SUV' },
          { value: 'luxury', label: 'Luxury' },
        ]}
        value="economy"
        onChange={() => {}}
      />

      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Search Cars
      </button>
    </form>
  );

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80")',
      }}
    >
      <div className="min-h-screen bg-black/40 backdrop-blur-sm py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Book Your Travel</h1>
            <p className="text-gray-200">Find the perfect flight, stay, or rental for your journey</p>
          </div>

          {/* Booking Type Tabs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg mb-6 p-1 inline-flex w-full sm:w-auto">
            <button
              onClick={() => setBookingType('flight')}
              className={`flex-1 sm:flex-none px-8 py-2 rounded-md text-sm font-medium transition-colors ${
                bookingType === 'flight'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Plane className="w-5 h-5 mx-auto mb-1" />
              Flights
            </button>
            <button
              onClick={() => setBookingType('hotel')}
              className={`flex-1 sm:flex-none px-8 py-2 rounded-md text-sm font-medium transition-colors ${
                bookingType === 'hotel'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Hotel className="w-5 h-5 mx-auto mb-1" />
              Hotels
            </button>
            <button
              onClick={() => setBookingType('car')}
              className={`flex-1 sm:flex-none px-8 py-2 rounded-md text-sm font-medium transition-colors ${
                bookingType === 'car'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Car className="w-5 h-5 mx-auto mb-1" />
              Cars
            </button>
          </div>

          {/* Booking Forms */}
          {bookingType === 'flight' && renderFlightForm()}
          {bookingType === 'hotel' && renderHotelForm()}
          {bookingType === 'car' && renderCarForm()}

          {/* Photo Credit */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-300">
              Photo by{' '}
              <a 
                href="https://unsplash.com/@danielkorpai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200"
              >
                Daniel Korpai
              </a>
              {' '}on{' '}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200"
              >
                Unsplash
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookTravel;