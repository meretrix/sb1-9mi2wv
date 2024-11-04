import React, { useState } from 'react';
import { 
  User, Mail, Phone, Building2, Calendar, Globe2, 
  FileText, Shield, Plane
} from 'lucide-react';
import TravelDocuments from './traveler/TravelDocuments';
import PreferencesCompliance from './traveler/PreferencesCompliance';
import RecentTrips from './traveler/RecentTrips';

interface TravelerProfileProps {
  traveler: any;
  onEdit: () => void;
}

export default function TravelerProfile({ traveler, onEdit }: TravelerProfileProps) {
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: 'Basic Info', icon: User },
    { id: 'documents', label: 'Travel Documents', icon: FileText },
    { id: 'preferences', label: 'Preferences & Compliance', icon: Shield },
    { id: 'trips', label: 'Recent Trips', icon: Plane },
  ];

  return (
    <div className="bg-white dark:bg-dark-mid shadow-sm rounded-lg border border-gray-200 dark:border-dark-primary">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-dark-primary flex items-center justify-center">
              <span className="text-2xl font-medium text-gray-600 dark:text-gray-300">
                {traveler.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{traveler.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">ID: {traveler.id}</p>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-primary rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-primary hover:bg-gray-50 dark:hover:bg-dark-secondary"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-dark-primary">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <tab.icon className={`-ml-1 mr-2 h-5 w-5 ${
                activeTab === tab.id ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
              }`} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">{traveler.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">{traveler.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Building2 className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">{traveler.department} - {traveler.role}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">Joined {new Date(traveler.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Globe2 className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">{traveler.nationality}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Emergency Contacts</h3>
                {traveler.emergencyContacts.map((contact: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-dark-primary rounded-lg">
                    <p className="font-medium text-sm text-gray-900 dark:text-white">{contact.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{contact.relationship}</p>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center">
                        <Phone className="w-3 h-3 text-gray-400 dark:text-gray-500 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">{contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-3 h-3 text-gray-400 dark:text-gray-500 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">{contact.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <TravelDocuments documents={traveler.documents} />
        )}

        {activeTab === 'preferences' && (
          <PreferencesCompliance 
            preferences={traveler.preferences}
            complianceStatus={traveler.complianceStatus}
          />
        )}

        {activeTab === 'trips' && (
          <RecentTrips trips={traveler.tripHistory} />
        )}
      </div>
    </div>
  );
}