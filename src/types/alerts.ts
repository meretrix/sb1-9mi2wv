export interface AlertLink {
  title: string;
  url: string;
  type: 'external' | 'internal';
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'error' | 'info';
  severity: 'high' | 'medium' | 'low';
  time: string;
  source: string;
  affectedTravelers?: string[];
  relatedTrips?: string[];
  links?: AlertLink[];
}