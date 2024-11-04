import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Vendor } from '../types';

interface VendorModalProps {
  vendor?: Vendor;
  onClose: () => void;
  onSave: (vendor: Omit<Vendor, 'id'>) => void;
}

export default function VendorModal({ vendor, onClose, onSave }: VendorModalProps) {
  const [formData, setFormData] = useState({
    name: vendor?.name || '',
    type: vendor?.type || 'airline',
    logo: vendor?.logo || '',
    contractStart: vendor?.contractStart || '',
    contractEnd: vendor?.contractEnd || '',
    status: vendor?.status || 'active',
    contactInfo: {
      name: vendor?.contactInfo.name || '',
      email: vendor?.contactInfo.email || '',
      phone: vendor?.contactInfo.phone || '',
    },
    deals: vendor?.deals || [{ description: '', code: '', discount: '' }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addDeal = () => {
    setFormData({
      ...formData,
      deals: [...formData.deals, { description: '', code: '', discount: '' }],
    });
  };

  const removeDeal = (index: number) => {
    setFormData({
      ...formData,
      deals: formData.deals.filter((_, i) => i !== index),
    });
  };

  const updateDeal = (index: number, field: keyof typeof formData.deals[0], value: string) => {
    const newDeals = [...formData.deals];
    newDeals[index] = { ...newDeals[index], [field]: value };
    setFormData({ ...formData, deals: newDeals });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {vendor ? 'Edit Vendor' : 'Add New Vendor'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Vendor['type'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="airline">Airline</option>
                <option value="hotel">Hotel</option>
                <option value="car">Car Rental</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Logo URL</label>
              <input
                type="url"
                required
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Vendor['status'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contract Start</label>
              <input
                type="date"
                required
                value={formData.contractStart}
                onChange={(e) => setFormData({ ...formData, contractStart: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contract End</label>
              <input
                type="date"
                required
                value={formData.contractEnd}
                onChange={(e) => setFormData({ ...formData, contractEnd: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                <input
                  type="text"
                  required
                  value={formData.contactInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, name: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.contactInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, email: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.contactInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, phone: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Corporate Deals</h3>
              <button
                type="button"
                onClick={addDeal}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Add Deal
              </button>
            </div>
            
            {formData.deals.map((deal, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    required
                    value={deal.description}
                    onChange={(e) => updateDeal(index, 'description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Code</label>
                  <input
                    type="text"
                    required
                    value={deal.code}
                    onChange={(e) => updateDeal(index, 'code', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Discount</label>
                  <input
                    type="text"
                    required
                    value={deal.discount}
                    onChange={(e) => updateDeal(index, 'discount', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {formData.deals.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDeal(index)}
                      className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {vendor ? 'Update Vendor' : 'Add Vendor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}