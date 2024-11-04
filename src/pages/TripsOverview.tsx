import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Filter } from 'lucide-react';
import { mockTrips } from '../data/mockTrips';
import { LOCATIONS } from '../data/locations';

type TripTab = 'all' | 'active' | 'upcoming' | 'completed';

function TripsOverview() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TripTab>('all');
  const [dateRange, setDateRange] = useState('last30');
  const [department, setDepartment] = useState('all');

  const filteredTrips = mockTrips.filter(trip => {
    const matchesSearch = 
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.traveler.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || trip.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400';
      case 'upcoming':
        return 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400';
      case 'completed':
        return 'text-gray-600 dark:text-gray-400 border-b-2 border-gray-600 dark:border-gray-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-dark-mid shadow-sm rounded-lg border border-gray-200 dark:border-dark-primary">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trips</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage all business trips
          </p>
        </div>

        {/* Search and Filters */}
        <div className="px-6 pb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-primary rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-primary dark:text-white"
              />
            </div>

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
                <option value="all">All time</option>
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
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              All Trips
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'active'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Trips List */}
      <div className="bg-white dark:bg-dark-mid shadow-sm rounded-lg border border-gray-200 dark:border-dark-primary overflow-hidden">
        {filteredTrips.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No trips found matching your criteria</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-dark-primary">
            {filteredTrips.map((trip) => {
              const location = LOCATIONS[trip.destination];
              if (!location) return null;

              return (
                <li
                  key={trip.id}
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  className="hover:bg-gray-50 dark:hover:bg-dark-primary cursor-pointer transition-colors duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <img
                          src={location.image}
                          alt={location.city}
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">
                            {location.city} 
                            {location.state && (
                              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                                {location.state}, {location.country}
                              </span>
                            )}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(trip.dates.start).toLocaleDateString()} - {new Date(trip.dates.end).toLocaleDateString()}
                        </p>
                        <div className="mt-2">
                          <div className="flex items-center">
                            <span className={getStatusStyles(trip.status)}>
                              {trip.status}
                            </span>
                            <span className="mx-2 text-gray-400 dark:text-gray-500">•</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{trip.traveler.name}</span>
                            <span className="mx-2 text-gray-400 dark:text-gray-500">•</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{trip.purpose}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                            {trip.segments.length} segments
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TripsOverview;