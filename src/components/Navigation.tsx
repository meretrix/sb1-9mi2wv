import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Map,
  FileText,
  Building2,
  Bell,
  Search,
  Luggage
} from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { path: '/travelers', icon: Users, label: 'Travelers' },
    { path: '/trips', icon: Luggage, label: 'Trips' },
    { path: '/book', icon: Briefcase, label: 'Book Travel' },
    { path: '/map', icon: Map, label: 'Live Map' },
    { path: '/policy', icon: FileText, label: 'Travel Policy' },
    { path: '/vendors', icon: Building2, label: 'Vendors' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/search', icon: Search, label: 'Search' },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`
          }
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;