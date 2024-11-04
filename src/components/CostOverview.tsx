import React from 'react';
import { Plane, Building2, Car } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CostOverviewProps {
  trip: any;
}

export default function CostOverview({ trip }: CostOverviewProps) {
  const costs = {
    air: {
      base: 995,
      taxes: 150,
      fees: 100,
    },
    lodging: {
      room: 1200,
      taxes: 180,
      resort_fee: 120,
    },
    ground: {
      base: 400,
      insurance: 75,
      fees: 25,
    },
  };

  const totalCost = Object.values(costs).reduce(
    (acc, curr) => acc + Object.values(curr).reduce((a, b) => a + b, 0),
    0
  );

  const segments = [
    { 
      type: 'air', 
      icon: Plane, 
      label: 'Flights', 
      cost: Object.values(costs.air).reduce((a, b) => a + b, 0),
      color: '#3B82F6'
    },
    { 
      type: 'lodging', 
      icon: Building2, 
      label: 'Hotels', 
      cost: Object.values(costs.lodging).reduce((a, b) => a + b, 0),
      color: '#10B981'
    },
    { 
      type: 'ground', 
      icon: Car, 
      label: 'Ground Transport', 
      cost: Object.values(costs.ground).reduce((a, b) => a + b, 0),
      color: '#6366F1'
    },
  ];

  const pieData = segments.map(segment => ({
    name: segment.label,
    value: segment.cost,
    color: segment.color
  }));

  return (
    <div className="space-y-6">
      {/* Total Cost */}
      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Total Trip Cost</h3>
        <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">${totalCost.toLocaleString()}</p>
      </div>

      {/* Cost Distribution */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-dark-mid rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Cost Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {segments.map((segment) => (
              <div key={segment.type} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                <span className="text-sm text-gray-600 dark:text-gray-300">{segment.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary by Type */}
        <div className="space-y-4">
          {segments.map((segment) => (
            <div key={segment.type} className="bg-gray-50 dark:bg-dark-primary rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-dark-mid rounded-lg">
                    <segment.icon className="w-5 h-5" style={{ color: segment.color }} />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{segment.label}</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${segment.cost.toLocaleString()}
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round((segment.cost / totalCost) * 100)}% of total
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Cost Breakdown */}
      <div className="bg-white dark:bg-dark-mid rounded-lg border border-gray-200 dark:border-dark-primary">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">Detailed Cost Breakdown</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-dark-primary">
          {/* Flight Costs */}
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="w-5 h-5 text-blue-500" />
              <h4 className="font-medium text-gray-900 dark:text-white">Flight Charges</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Base Fare</span>
                <span className="text-gray-900 dark:text-white">${costs.air.base}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Taxes</span>
                <span className="text-gray-900 dark:text-white">${costs.air.taxes}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Fees & Surcharges</span>
                <span className="text-gray-900 dark:text-white">${costs.air.fees}</span>
              </div>
            </div>
          </div>

          {/* Hotel Costs */}
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="w-5 h-5 text-emerald-500" />
              <h4 className="font-medium text-gray-900 dark:text-white">Hotel Charges</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Room Rate</span>
                <span className="text-gray-900 dark:text-white">${costs.lodging.room}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Taxes</span>
                <span className="text-gray-900 dark:text-white">${costs.lodging.taxes}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Resort Fee</span>
                <span className="text-gray-900 dark:text-white">${costs.lodging.resort_fee}</span>
              </div>
            </div>
          </div>

          {/* Ground Transport Costs */}
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="w-5 h-5 text-indigo-500" />
              <h4 className="font-medium text-gray-900 dark:text-white">Ground Transport Charges</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Base Rate</span>
                <span className="text-gray-900 dark:text-white">${costs.ground.base}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Insurance</span>
                <span className="text-gray-900 dark:text-white">${costs.ground.insurance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Fees & Surcharges</span>
                <span className="text-gray-900 dark:text-white">${costs.ground.fees}</span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="p-6 bg-gray-50 dark:bg-dark-primary">
            <div className="flex justify-between font-medium">
              <span className="text-gray-900 dark:text-white">Total Trip Cost</span>
              <span className="text-gray-900 dark:text-white">${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}