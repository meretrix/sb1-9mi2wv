import React from 'react';
import { CreditCard, Download } from 'lucide-react';

interface Document {
  type: string;
  number: string;
  expiry: string;
  country: string;
  status: 'valid' | 'expiring' | 'expired';
}

interface TravelDocumentsProps {
  documents: Document[];
}

export default function TravelDocuments({ documents }: TravelDocumentsProps) {
  const getDocumentStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'valid':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
      case 'expiring':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
      case 'expired':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
    }
  };

  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <div key={index} className="p-4 bg-gray-50 dark:bg-dark-primary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" />
              <span className="font-medium text-sm text-gray-900 dark:text-white">{doc.type}</span>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentStatusColor(doc.status)}`}>
              {doc.status}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Number</p>
              <p>{doc.number}</p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Country</p>
              <p>{doc.country}</p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Expiry Date</p>
              <p>{new Date(doc.expiry).toLocaleDateString()}</p>
            </div>
          </div>
          <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center">
            <Download className="w-3 h-3 mr-1" />
            Download Copy
          </button>
        </div>
      ))}
    </div>
  );
}