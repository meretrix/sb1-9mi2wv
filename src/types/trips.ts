export type TripStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type SegmentType = 'air' | 'ground' | 'lodging';
export type SegmentSubtype = 'flight' | 'taxi' | 'hotel';
export type SegmentStatus = 'confirmed' | 'pending' | 'cancelled';

export interface TripDates {
  start: string;
  end: string;
}

export interface Traveler {
  id: string;
  name: string;
  department: string;
  email: string;
}

export interface SegmentDetails {
  airline?: string;
  flightNumber?: string;
  seat?: string;
  class?: string;
  nights?: number;
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
}

export interface TripSegment {
  id: string;
  type: SegmentType;
  subtype: SegmentSubtype;
  from: string;
  to?: string;
  datetime: string;
  confirmationNumber: string;
  recordLocator?: string;
  status: SegmentStatus;
  details?: SegmentDetails;
}

export interface Document {
  id: string;
  type: string;
  name: string;
  url: string;
}

export interface Note {
  id: string;
  date: string;
  author: string;
  content: string;
}

export interface Trip {
  id: string;
  purpose: string;
  destination: string;
  status: TripStatus;
  dates: TripDates;
  traveler: Traveler;
  segments: TripSegment[];
  documents: Document[];
  notes: Note[];
}