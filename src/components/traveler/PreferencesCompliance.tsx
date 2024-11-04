import React from 'react';
import { Plane, Hotel, Car, CheckCircle, AlertTriangle, Shield } from 'lucide-react';

interface PreferencesComplianceProps {
  preferences: Array<{
    category: string;
    preference: string;
  }>;
  complianceStatus: {
    policyAccepted: boolean;
    trainingCompleted: boolean;
    lastTrainingDate: string;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

export default function PreferencesCompliance({ 
  preferences, 
  complianceStatus 
}: PreferencesComplianceProps) {
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Travel Preferences */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Travel Preferences</h3>
        <div className="space-y-4">
          {preferences.map((pref, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-dark-primary rounded-lg">
              <div className="flex items-center space-x-3">
                {pref.category === 'flight' && <Plane className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
                {pref.category === 'hotel' && <Hotel className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
                {pref.category === 'car' && <Car className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">{pref.category} Preferences</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{pref.preference}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Status */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Compliance Status</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-dark-primary rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Policy Acceptance</span>
              {complianceStatus.policyAccepted ? (
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />
              )}
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-dark-primary rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Safety Training</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Last completed: {new Date(complianceStatus.lastTrainingDate).toLocaleDateString()}
                </p>
              </div>
              {complianceStatus.trainingCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />
              )}
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-dark-primary rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Risk Assessment</span>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelColor(complianceStatus.riskLevel)}`}>
                {complianceStatus.riskLevel} risk
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}