import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Users,
  Download, Filter, Calendar, PieChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const metrics = [
  {
    id: 'spend',
    name: 'Total Spend YTD',
    value: '$342,984',
    change: '+14.5%',
    icon: DollarSign,
  },
  {
    id: 'trips',
    name: 'Average Trip Cost',
    value: '$2,847',
    change: '-2.3%',
    icon: TrendingUp,
  },
  {
    id: 'travelers',
    name: 'Active Travelers',
    value: '127',
    change: '+5.9%',
    icon: Users,
  },
  {
    id: 'compliance',
    name: 'Policy Compliance',
    value: '94.2%',
    change: '+2.1%',
    icon: BarChart3,
  },
];

function Reporting() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('last30');
  const [department, setDepartment] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Travel Reporting</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and analyze travel program performance
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
          >
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="last90">Last 90 days</option>
            <option value="ytd">Year to date</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
          >
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="engineering">Engineering</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => navigate(`/reporting/${metric.id}`)}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left w-full"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {metric.value}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <metric.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
              <span className="text-sm text-gray-600"> vs last period</span>
            </div>
          </button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend by Category */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Spend by Category</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { category: 'Flights', amount: 156432, percentage: 45 },
              { category: 'Hotels', amount: 98654, percentage: 29 },
              { category: 'Car Rentals', amount: 45789, percentage: 13 },
              { category: 'Other', amount: 41109, percentage: 13 },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.category}</span>
                  <span className="font-medium text-gray-900">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className="bg-blue-500 rounded"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Top Destinations</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { city: 'New York', trips: 45, spend: 78500 },
              { city: 'London', trips: 32, spend: 65400 },
              { city: 'San Francisco', trips: 28, spend: 52300 },
              { city: 'Singapore', trips: 24, spend: 48900 },
              { city: 'Tokyo', trips: 20, spend: 43200 },
            ].map((destination) => (
              <div key={destination.city} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {destination.city}
                  </p>
                  <p className="text-xs text-gray-500">
                    {destination.trips} trips
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ${destination.spend.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reporting;