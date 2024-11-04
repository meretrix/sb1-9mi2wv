import React from 'react';
import { 
  AlertTriangle, Bell, X, ExternalLink, 
  Plane, Building2, Clock, CheckCircle,
  Users
} from 'lucide-react';
import { mockAlerts } from '../data/mockAlerts';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  if (!isOpen) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getAlertBg = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50';
      case 'error':
        return 'bg-red-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-96 max-h-[calc(100vh-8rem)] overflow-y-auto bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-400" />
            <h3 className="ml-2 text-sm font-medium text-gray-900">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-200">
          {mockAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                alert.type === 'error' ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getAlertBg(alert.type)} flex items-center justify-center`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {alert.title}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {alert.message}
                  </p>
                  
                  {/* Additional Info */}
                  {(alert.affectedTravelers || alert.relatedTrips) && (
                    <div className="mt-2 space-y-1">
                      {alert.affectedTravelers && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {alert.affectedTravelers.length} affected travelers
                        </div>
                      )}
                      {alert.relatedTrips && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Plane className="w-3 h-3 mr-1" />
                          {alert.relatedTrips.length} related trips
                        </div>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  {alert.links && alert.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {alert.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-500"
                        >
                          {link.title}
                          {link.type === 'external' && (
                            <ExternalLink className="w-3 h-3 ml-1" />
                          )}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Time and Source */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {alert.time}
                    </span>
                    <span className="text-xs text-gray-500">
                      {alert.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 text-center border-t border-gray-200">
          <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
}