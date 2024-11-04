import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TravelerProfile from '../components/TravelerProfile';

// Mock data for demonstration
const mockTraveler = {
  id: 'T001',
  name: 'Sarah Wilson',
  email: 'sarah.wilson@company.com',
  phone: '+1 (555) 123-4567',
  department: 'Sales',
  role: 'Senior Account Executive',
  joinDate: '2022-03-15',
  status: 'active' as const,
  nationality: 'United States',
  documents: [
    {
      type: 'Passport',
      number: 'P123456789',
      expiry: '2025-06-30',
      country: 'United States',
      status: 'valid' as const,
    },
    {
      type: 'Visa',
      number: 'V987654321',
      expiry: '2024-04-15',
      country: 'United Kingdom',
      status: 'expiring' as const,
    },
  ],
  preferences: [
    {
      category: 'flight',
      preference: 'Window seat, Economy Plus when available',
    },
    {
      category: 'hotel',
      preference: 'Non-smoking room, High floor',
    },
    {
      category: 'car',
      preference: 'Mid-size SUV, Automatic transmission',
    },
  ],
  emergencyContacts: [
    {
      name: 'John Wilson',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
      email: 'john.wilson@email.com',
    },
    {
      name: 'Mary Smith',
      relationship: 'Sister',
      phone: '+1 (555) 456-7890',
      email: 'mary.smith@email.com',
    },
  ],
  tripHistory: [
    {
      id: 'TR001',
      destination: 'London, UK',
      dates: 'Mar 1-5, 2024',
      purpose: 'Client Meetings',
      status: 'completed',
      cost: 3450,
    },
    {
      id: 'TR002',
      destination: 'Singapore',
      dates: 'Feb 15-20, 2024',
      purpose: 'Conference',
      status: 'completed',
      cost: 4200,
    },
    {
      id: 'TR003',
      destination: 'New York, NY',
      dates: 'Jan 8-10, 2024',
      purpose: 'Training',
      status: 'completed',
      cost: 1850,
    },
  ],
  complianceStatus: {
    policyAccepted: true,
    trainingCompleted: true,
    lastTrainingDate: '2024-01-15',
    riskLevel: 'low' as const,
  },
};

function TravelerDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  // In a real app, fetch traveler data based on ID
  const traveler = mockTraveler;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/travelers')}
            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Traveler Profile</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View and manage traveler details and preferences
            </p>
          </div>
        </div>
      </div>

      <TravelerProfile
        traveler={traveler}
        onEdit={() => setShowEditModal(true)}
      />

      {/* Edit Modal would go here */}
    </div>
  );
}

export default TravelerDetails;