import React, { useState } from 'react';
import { 
  Users, Plane, AlertTriangle, Building2,
  TrendingUp, Percent, DollarSign, AlertCircle,
  ArrowRight, ChevronRight, BarChart3, Download,
  Filter, Calendar, PieChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import AlertDialog from '../components/AlertDialog';
import { Alert } from '../types/alerts';
import { mockAlerts } from '../data/mockAlerts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [hoveredAlert, setHoveredAlert] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('last30');
  const [department, setDepartment] = useState('all');

  const stats = [
    {
      id: 'travelers',
      title: 'Active Travelers',
      value: '342',
      change: '+4.75%',
      trend: 'up',
      icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    },
    {
      id: 'trip-cost',
      title: 'Average Trip Cost',
      value: '$3,245',
      change: '+1.23%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
    },
    {
      id: 'compliance',
      title: 'Policy Compliance',
      value: '94.2%',
      change: '+2.4%',
      trend: 'up',
      icon: <Percent className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
    },
    {
      id: 'spend',
      title: 'Monthly Spend',
      value: '$284.5k',
      change: '-2.1%',
      trend: 'down',
      icon: <DollarSign className="w-6 h-6 text-amber-600 dark:text-amber-400" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Travel Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Overview of your travel program
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 dark:border-dark-primary rounded-lg px-4 py-2 bg-white dark:bg-dark-primary dark:text-white"
            >
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="ytd">Year to date</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border border-gray-300 dark:border-dark-primary rounded-lg px-4 py-2 bg-white dark:bg-dark-primary dark:text-white"
            >
              <option value="all">All Departments</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="engineering">Engineering</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-primary rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-primary hover:bg-gray-50 dark:hover:bg-dark-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <button
            key={stat.id}
            onClick={() => navigate(`/metrics/${stat.id}`)}
            className="bg-white dark:bg-dark-mid rounded-lg shadow-sm p-6 border border-gray-100 dark:border-dark-primary hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200 text-left w-full group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-sm ${
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Travelers Map</h3>
          </div>
          <div className="h-[400px]">
            <Map />
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm border border-gray-200 dark:border-dark-primary">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-primary">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Alerts</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-dark-primary">
              {mockAlerts.slice(0, 5).map((alert) => (
                <button
                  key={alert.id}
                  className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-dark-primary transition-colors duration-150 ${
                    hoveredAlert === alert.id ? 'bg-gray-50 dark:bg-dark-primary' : ''
                  }`}
                  onClick={() => setSelectedAlert(alert)}
                  onMouseEnter={() => setHoveredAlert(alert.id)}
                  onMouseLeave={() => setHoveredAlert(null)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-1.5 rounded-full flex-shrink-0 ${
                      alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30' :
                      alert.type === 'error' ? 'text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/30' :
                      'text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    }`}>
                      {alert.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                       alert.type === 'error' ? <AlertTriangle className="w-4 h-4" /> :
                       <AlertCircle className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {alert.title}
                        </p>
                        <ChevronRight className={`w-4 h-4 transition-colors ${
                          hoveredAlert === alert.id ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                        }`} />
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {alert.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend by Category */}
        <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm p-6 border border-gray-200 dark:border-dark-primary">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Spend by Category</h3>
            <PieChart className="w-5 h-5 text-gray-400 dark:text-gray-500" />
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
                  <span className="text-gray-600 dark:text-gray-400">{item.category}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100 dark:bg-dark-primary">
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className="bg-blue-500 dark:bg-blue-600 rounded"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white dark:bg-dark-mid rounded-lg shadow-sm p-6 border border-gray-200 dark:border-dark-primary">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Top Destinations</h3>
            <BarChart3 className="w-5 h-5 text-gray-400 dark:text-gray-500" />
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
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {destination.city}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {destination.trips} trips
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ${destination.spend.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Dialog */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AlertDialog alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;