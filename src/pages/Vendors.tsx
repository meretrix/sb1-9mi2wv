import React, { useState } from 'react';
import { 
  Building2, Plus, Edit2, Trash2, Search, Filter,
  Plane, Hotel, Car, Train, Package, ExternalLink,
  FileText, CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';
import VendorModal from '../components/VendorModal';
import type { Vendor } from '../types';

const initialVendors: Vendor[] = [
  {
    id: 'v1',
    name: 'United Airlines',
    type: 'air',
    logo: 'https://images.unsplash.com/photo-1544016768-982d1554f0b9?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Discount Program', code: 'CORP2024UA', discount: '15% off Business Class' },
      { description: 'Premium Economy Upgrade', code: 'PEUP2024', discount: 'Complimentary when available' },
    ],
    contactInfo: {
      name: 'John Smith',
      email: 'john.smith@united.com',
      phone: '+1 (555) 123-4567',
    },
  },
  {
    id: 'v2',
    name: 'Hilton Hotels',
    type: 'stays',
    logo: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2025-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Rate Program', code: 'HILCORP24', discount: 'Up to 20% off BAR' },
      { description: 'Executive Lounge Access', code: 'EXECL24', discount: 'Complimentary for all stays' },
    ],
    contactInfo: {
      name: 'Sarah Johnson',
      email: 'sarah.j@hilton.com',
      phone: '+1 (555) 987-6543',
    },
  },
  {
    id: 'v3',
    name: 'Enterprise',
    type: 'car',
    logo: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-02-01',
    contractEnd: '2025-01-31',
    status: 'active',
    deals: [
      { description: 'Corporate Fleet Program', code: 'ENT2024CORP', discount: '25% off all rentals' },
    ],
    contactInfo: {
      name: 'Mike Wilson',
      email: 'm.wilson@enterprise.com',
      phone: '+1 (555) 456-7890',
    },
  },
  {
    id: 'v4',
    name: 'Amtrak',
    type: 'rail',
    logo: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Business Class Discount', code: 'AMTCORP24', discount: '10% off Business Class' },
    ],
    contactInfo: {
      name: 'Lisa Brown',
      email: 'l.brown@amtrak.com',
      phone: '+1 (555) 789-0123',
    },
  },
];

type VendorType = 'air' | 'stays' | 'car' | 'rail' | 'misc';

function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<VendorType>('air');
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | undefined>();

  const tabs: { type: VendorType; label: string; icon: React.ComponentType }[] = [
    { type: 'air', label: 'Air', icon: Plane },
    { type: 'stays', label: 'Stays', icon: Hotel },
    { type: 'car', label: 'Car', icon: Car },
    { type: 'rail', label: 'Rail', icon: Train },
    { type: 'misc', label: 'Misc', icon: Package },
  ];

  const getStatusColor = (status: Vendor['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'expired':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
    }
  };

  const handleSaveVendor = (vendorData: Omit<Vendor, 'id'>) => {
    if (editingVendor) {
      setVendors(vendors.map(v => v.id === editingVendor.id ? { ...vendorData, id: editingVendor.id } : v));
      toast.success('Vendor updated successfully');
    } else {
      const newVendor = { ...vendorData, id: `v${vendors.length + 1}` };
      setVendors([...vendors, newVendor]);
      toast.success('Vendor added successfully');
    }
    setShowModal(false);
    setEditingVendor(undefined);
  };

  const handleDeleteVendor = (id: string) => {
    setVendors(vendors.filter(v => v.id !== id));
    toast.success('Vendor removed successfully');
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.deals.some(deal => deal.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return vendor.type === activeTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage travel supplier relationships, contracts, and corporate rates
          </p>
        </div>
        <button
          onClick={() => {
            setEditingVendor(undefined);
            setShowModal(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </button>
      </div>

      {/* Search and Tabs */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search vendors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-primary rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-primary dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-dark-primary">
          <nav className="flex -mb-px space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.type}
                onClick={() => setActiveTab(tab.type)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.type
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{vendor.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Contract: {new Date(vendor.contractStart).toLocaleDateString()} - {new Date(vendor.contractEnd).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{vendor.contactInfo.name}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setEditingVendor(vendor);
                    setShowModal(true);
                  }}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteVendor(vendor.id)}
                  className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-6">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Corporate Rates & Deals</h4>
                <div className="flex flex-wrap gap-3">
                  {vendor.deals.map((deal, index) => (
                    <div key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      <CreditCard className="w-3 h-3 mr-1" />
                      {deal.code}
                    </div>
                  ))}
                </div>
              </div>
              <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                <FileText className="w-4 h-4 mr-1" />
                View Contract
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Vendor Modal */}
      {showModal && (
        <VendorModal
          vendor={editingVendor}
          onClose={() => {
            setShowModal(false);
            setEditingVendor(undefined);
          }}
          onSave={handleSaveVendor}
        />
      )}
    </div>
  );
}

export default Vendors;