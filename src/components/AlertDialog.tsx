import React from 'react';
import { AlertTriangle, AlertCircle, X, ExternalLink } from 'lucide-react';
import { Alert } from '../types/alerts';

interface AlertDialogProps {
  alert: Alert;
  onClose: () => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle className="w-5 h-5" />;
    case 'error':
      return <AlertTriangle className="w-5 h-5" />;
    default:
      return <AlertCircle className="w-5 h-5" />;
  }
};

const getTypeStyles = (type: string) => {
  switch (type) {
    case 'warning':
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
      };
    case 'error':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: 'text-red-600',
      };
    default:
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: 'text-blue-600',
      };
  }
};

const AlertDialog: React.FC<AlertDialogProps> = ({ alert, onClose }) => {
  const styles = getTypeStyles(alert.type);

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
      <div className={`${styles.bg} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <span className={styles.icon}>{getTypeIcon(alert.type)}</span>
          <h3 className={`${styles.text} font-semibold text-lg`}>{alert.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        <p className="text-gray-700">{alert.message}</p>
        
        {alert.affectedTravelers && alert.affectedTravelers.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Affected Travelers</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {alert.affectedTravelers.map((traveler, index) => (
                <li key={index}>{traveler}</li>
              ))}
            </ul>
          </div>
        )}

        {alert.relatedTrips && alert.relatedTrips.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Related Trips</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {alert.relatedTrips.map((trip, index) => (
                <li key={index}>{trip}</li>
              ))}
            </ul>
          </div>
        )}

        {alert.links && alert.links.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Additional Information</h4>
            <div className="space-y-2">
              {alert.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>{link.title}</span>
                  {link.type === 'external' && <ExternalLink className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
          <span>Source: {alert.source}</span>
          <span>{alert.time}</span>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;