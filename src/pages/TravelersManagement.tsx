import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, Mail, Search, MoreVertical, Edit2, Trash2, 
  CheckCircle, XCircle, Filter 
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Traveler {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'inactive';
  lastActivity: string;
}

// Generate 200 fake travelers
const initialTravelers: Traveler[] = Array.from({ length: 200 }, (_, i) => ({
  id: `T${(i + 1).toString().padStart(3, '0')}`,
  name: [
    'Sarah Wilson', 'Michael Chen', 'Emma Davis', 'James Rodriguez', 'Sophia Kim',
    'David Patel', 'Lisa Thompson', 'John Smith', 'Maria Garcia', 'Robert Johnson'
  ][Math.floor(Math.random() * 10)],
  email: `employee${i + 1}@company.com`,
  department: ['Sales', 'Marketing', 'Engineering', 'Finance', 'HR', 'Operations'][Math.floor(Math.random() * 6)],
  role: ['Manager', 'Senior', 'Associate', 'Director', 'Coordinator'][Math.floor(Math.random() * 5)],
  status: Math.random() > 0.2 ? 'active' : 'inactive',
  lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
}));

function TravelersManagement() {
  const navigate = useNavigate();
  const [travelers, setTravelers] = useState<Traveler[]>(initialTravelers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const itemsPerPage = 10;

  const handleStatusToggle = (id: string) => {
    setTravelers(travelers.map(t => 
      t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t
    ));
    toast.success('Status updated successfully');
  };

  const handleDelete = (id: string) => {
    setTravelers(travelers.filter(t => t.id !== id));
    toast.success('Traveler removed successfully');
  };

  const filteredTravelers = travelers.filter(traveler => {
    const matchesSearch = 
      traveler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      traveler.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      traveler.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || traveler.department === selectedDepartment;
    const matchesStatus = !selectedStatus || traveler.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTravelers.length / itemsPerPage);
  const paginatedTravelers = filteredTravelers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Travelers Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage company travelers and their profiles
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Traveler
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search travelers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-primary rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-primary dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 dark:border-dark-primary rounded-lg px-4 py-2 bg-white dark:bg-dark-primary dark:text-white"
          >
            <option value="">All Departments</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="HR">HR</option>
            <option value="Operations">Operations</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 dark:border-dark-primary rounded-lg px-4 py-2 bg-white dark:bg-dark-primary dark:text-white"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Travelers Table */}
      <div className="bg-white dark:bg-dark-mid shadow-sm rounded-lg border border-gray-200 dark:border-dark-primary">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-primary">
          <thead className="bg-gray-50 dark:bg-dark-primary">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name & Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-mid divide-y divide-gray-200 dark:divide-dark-primary">
            {paginatedTravelers.map((traveler) => (
              <tr 
                key={traveler.id}
                onClick={() => navigate(`/travelers/${traveler.id}`)}
                className="hover:bg-gray-50 dark:hover:bg-dark-primary cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-dark-primary flex items-center justify-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                          {traveler.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {traveler.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {traveler.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {traveler.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {traveler.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusToggle(traveler.id);
                    }}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      traveler.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {traveler.status === 'active' ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-1" />
                    )}
                    {traveler.status}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(traveler.lastActivity).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit handler
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(traveler.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white dark:bg-dark-mid px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-dark-primary sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-primary text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-primary hover:bg-gray-50 dark:hover:bg-dark-secondary disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-primary text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-primary hover:bg-gray-50 dark:hover:bg-dark-secondary disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{' '}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredTravelers.length)}
                </span>{' '}
                of{' '}
                <span className="font-medium">{filteredTravelers.length}</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-dark-primary bg-white dark:bg-dark-primary text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-secondary disabled:opacity-50"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-dark-primary bg-white dark:bg-dark-primary text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-secondary disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-primary bg-white dark:bg-dark-primary text-sm font-medium text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-dark-primary bg-white dark:bg-dark-primary text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-secondary disabled:opacity-50"
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-dark-primary bg-white dark:bg-dark-primary text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-secondary disabled:opacity-50"
                >
                  Last
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelersManagement;