import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  User,
  Mail,
  Phone,
  Building,
  Luggage,
  Globe,
  Calendar,
  CreditCard
} from 'lucide-react';

interface TravelerProfileProps {
  travelers: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
    passportNumber: string;
    nationality: string;
    dateOfBirth: string;
    preferredPaymentMethod: string;
  }>;
}

const TravelerProfile: React.FC<TravelerProfileProps> = ({ travelers }) => {
  const { id } = useParams();
  const traveler = travelers.find(t => t.id === Number(id));

  if (!traveler) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">Traveler not found</h2>
      </div>
    );
  }

  const profileItems = [
    { icon: User, label: 'Name', value: traveler.name },
    { icon: Mail, label: 'Email', value: traveler.email },
    { icon: Phone, label: 'Phone', value: traveler.phone },
    { icon: Building, label: 'Department', value: traveler.department },
    { icon: Luggage, label: 'Passport Number', value: traveler.passportNumber },
    { icon: Globe, label: 'Nationality', value: traveler.nationality },
    { icon: Calendar, label: 'Date of Birth', value: traveler.dateOfBirth },
    { icon: CreditCard, label: 'Preferred Payment', value: traveler.preferredPaymentMethod }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Traveler Profile</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                <p className="mt-1 text-sm text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelerProfile;