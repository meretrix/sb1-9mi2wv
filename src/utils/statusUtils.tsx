import React from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getStatusIcon(status: string) {
  switch (status) {
    case 'active':
      return <AlertTriangle className="w-3 h-3 mr-1" />;
    case 'upcoming':
      return <Clock className="w-3 h-3 mr-1" />;
    case 'completed':
      return <CheckCircle className="w-3 h-3 mr-1" />;
    default:
      return null;
  }
}