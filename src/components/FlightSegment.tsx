import React from 'react';
import { 
  Plane, Clock, MapPin, Calendar, 
  CreditCard, AlertTriangle, Users
} from 'lucide-react';
import { format } from 'date-fns';
import FlightDetails from './FlightDetails';
import { aircraftData } from '../data/aircraftData';

interface FlightSegmentProps {
  flight: any;
}

export default function FlightSegment({ flight }: FlightSegmentProps) {
  const aircraft = aircraftData[flight.details?.aircraft || 'B737-800'];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <FlightDetails segment={flight} aircraft={aircraft} />
      </div>
    </div>
  );
}