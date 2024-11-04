import React, { useState } from 'react';
import { 
  BookOpen, Plus, Edit2, Trash2, Check, X, AlertTriangle,
  FileText, DollarSign, Plane, Hotel, Car, Users,
  Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PolicyRule {
  id: string;
  category: 'flight' | 'hotel' | 'car' | 'general';
  title: string;
  description: string;
  limit?: number;
  status: 'active' | 'draft';
  lastUpdated: string;
}

const initialPolicies: PolicyRule[] = [
  {
    id: 'P1',
    category: 'flight',
    title: 'Domestic Flight Booking',
    description: 'Economy class for flights under 6 hours. Business class allowed for flights over 6 hours with executive approval.',
    limit: 1000,
    status: 'active',
    lastUpdated: '2024-03-01',
  },
  {
    id: 'P2',
    category: 'hotel',
    title: 'Hotel Accommodations',
    description: 'Standard rooms at approved business hotels. Maximum rate varies by city tier.',
    limit: 300,
    status: 'active',
    lastUpdated: '2024-03-05',
  },
  {
    id: 'P3',
    category: 'car',
    title: 'Car Rental Guidelines',
    description: 'Economy or midsize vehicles only. Luxury vehicles require executive approval.',
    limit: 75,
    status: 'active',
    lastUpdated: '2024-03-10',
  },
];

function TravelPolicy() {
  const [policies, setPolicies] = useState<PolicyRule[]>(initialPolicies);
  const [editingPolicy, setEditingPolicy] = useState<PolicyRule | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const getCategoryIcon = (category: PolicyRule['category']) => {
    const iconClasses = {
      flight: 'text-blue-600 dark:text-blue-400',
      hotel: 'text-emerald-600 dark:text-emerald-400',
      car: 'text-purple-600 dark:text-purple-400',
      general: 'text-gray-600 dark:text-gray-400'
    };

    switch (category) {
      case 'flight':
        return <Plane className={`w-5 h-5 ${iconClasses.flight}`} />;
      case 'hotel':
        return <Hotel className={`w-5 h-5 ${iconClasses.hotel}`} />;
      case 'car':
        return <Car className={`w-5 h-5 ${iconClasses.car}`} />;
      default:
        return <Users className={`w-5 h-5 ${iconClasses.general}`} />;
    }
  };

  const handleSavePolicy = (policy: PolicyRule) => {
    if (editingPolicy) {
      setPolicies(policies.map(p => p.id === policy.id ? policy : p));
      toast.success('Policy updated successfully');
    } else {
      setPolicies([...policies, { ...policy, id: `P${policies.length + 1}` }]);
      toast.success('New policy created successfully');
    }
    setShowPolicyModal(false);
    setEditingPolicy(null);
  };

  const handleDeletePolicy = (id: string) => {
    setPolicies(policies.filter(p => p.id !== id));
    toast.success('Policy deleted successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Travel Policy</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and deploy company travel policies and guidelines
          </p>
        </div>
        <button
          onClick={() => {
            setEditingPolicy(null);
            setShowPolicyModal(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Policy
        </button>
      </div>

      {/* Policy Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['flight', 'hotel', 'car', 'general'].map((category) => {
          const getBgColor = () => {
            switch (category) {
              case 'flight':
                return 'bg-blue-50 dark:bg-blue-900/20';
              case 'hotel':
                return 'bg-emerald-50 dark:bg-emerald-900/20';
              case 'car':
                return 'bg-purple-50 dark:bg-purple-900/20';
              default:
                return 'bg-gray-50 dark:bg-gray-800/50';
            }
          };

          return (
            <div key={category} className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${getBgColor()}`}>
                  {getCategoryIcon(category as PolicyRule['category'])}
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {policies.filter(p => p.category === category).length} rules
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                {category.charAt(0).toUpperCase() + category.slice(1)} Policies
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {policies.filter(p => p.category === category && p.status === 'active').length} active rules
              </p>
            </div>
          );
        })}
      </div>

      {/* Policy List */}
      <div className="bg-white dark:bg-dark-mid shadow-sm rounded-lg border border-gray-200 dark:border-dark-primary overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary bg-gray-50 dark:bg-dark-primary">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Policy Rules</h2>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-dark-primary">
          {policies.map((policy) => (
            <li key={policy.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    policy.category === 'flight' ? 'bg-blue-50 dark:bg-blue-900/20' :
                    policy.category === 'hotel' ? 'bg-emerald-50 dark:bg-emerald-900/20' :
                    policy.category === 'car' ? 'bg-purple-50 dark:bg-purple-900/20' :
                    'bg-gray-50 dark:bg-gray-800/50'
                  }`}>
                    {getCategoryIcon(policy.category)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {policy.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        policy.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                      }`}>
                        {policy.status === 'active' ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {policy.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{policy.description}</p>
                    {policy.limit && (
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Maximum limit: ${policy.limit} per day
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setEditingPolicy(policy);
                      setShowPolicyModal(true);
                    }}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePolicy(policy.id)}
                    className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-mid rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {editingPolicy ? 'Edit Policy Rule' : 'Create New Policy Rule'}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newPolicy: PolicyRule = {
                id: editingPolicy?.id || '',
                category: formData.get('category') as PolicyRule['category'],
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                limit: Number(formData.get('limit')) || undefined,
                status: formData.get('status') as PolicyRule['status'],
                lastUpdated: new Date().toISOString().split('T')[0],
              };
              handleSavePolicy(newPolicy);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select
                  name="category"
                  defaultValue={editingPolicy?.category || 'flight'}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-primary shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-primary dark:text-white"
                >
                  <option value="flight">Flight</option>
                  <option value="hotel">Hotel</option>
                  <option value="car">Car Rental</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingPolicy?.title}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-primary shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-primary dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingPolicy?.description}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-primary shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-primary dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Daily Limit ($)</label>
                <input
                  type="number"
                  name="limit"
                  defaultValue={editingPolicy?.limit}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-primary shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-primary dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                  name="status"
                  defaultValue={editingPolicy?.status || 'draft'}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-primary shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-primary dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowPolicyModal(false);
                    setEditingPolicy(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-primary rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {editingPolicy ? 'Update Policy' : 'Create Policy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TravelPolicy;