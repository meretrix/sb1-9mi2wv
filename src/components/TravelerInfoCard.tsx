import React from 'react';
import { User, Mail, Building2, Clock, FileText } from 'lucide-react';

interface TravelerInfoCardProps {
  traveler: {
    id: string;
    name: string;
    department: string;
    email: string;
  };
  documents: Array<{
    id: string;
    type: string;
    name: string;
    url: string;
  }>;
  status: string;
}

export default function TravelerInfoCard({ traveler, documents, status }: TravelerInfoCardProps) {
  return (
    <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar and Basic Info */}
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {traveler.name}
                </h3>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1" />
                    {traveler.department}
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {traveler.email}
                  </div>
                </div>
              </div>

              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                status === 'active' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              }`}>
                {status}
              </span>
            </div>

            {/* Documents */}
            {documents.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {documents.map(doc => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-dark-primary text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-secondary transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                    {doc.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}