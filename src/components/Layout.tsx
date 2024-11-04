import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, Users, BookOpen, Plane, 
  Building2, Bell, Search, Menu, X, LogOut, Luggage,
  Command, ChevronsLeft, ChevronsRight, Sun, Moon,
  Settings, User, ChevronDown
} from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';
import GlobalSearch from './GlobalSearch';
import { useTheme } from '../contexts/ThemeContext';

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', icon: LayoutGrid, label: 'Dashboard' },
    { path: '/trips', icon: Luggage, label: 'Trips' },
    { path: '/travelers', icon: Users, label: 'Travelers' },
    { path: '/policy', icon: BookOpen, label: 'Travel Policy' },
    { path: '/vendors', icon: Building2, label: 'Vendors' },
    { path: '/book', icon: Plane, label: 'Book Travel' },
  ];

  const userMenuItems = [
    { path: '/profile', icon: User, label: 'My Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 bg-white dark:bg-dark-mid border-r border-gray-200 dark:border-dark-primary transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-16'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center justify-between px-4 py-6 border-b border-gray-200 dark:border-dark-primary ${
            isSidebarOpen ? '' : 'justify-center'
          }`}>
            {isSidebarOpen ? (
              <span className="text-xl font-bold text-gray-900 dark:text-white">Travel Portal</span>
            ) : (
              <Plane className="w-6 h-6 text-gray-900 dark:text-white" />
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 dark:bg-dark-primary text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-primary hover:text-gray-900 dark:hover:text-gray-300'
                } ${isSidebarOpen ? 'px-4' : 'justify-center'}`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <item.icon className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : ''}`} />
                {isSidebarOpen && item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="px-2 py-4 border-t border-gray-200 dark:border-dark-primary">
            {/* User Account Button */}
            <button
              onClick={() => setUserMenuOpen(!isUserMenuOpen)}
              className={`w-full flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-primary hover:text-gray-900 dark:hover:text-gray-300 ${
                isSidebarOpen ? 'px-4 py-2 justify-between' : 'p-2 justify-center'
              }`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">JD</span>
                </div>
                {isSidebarOpen && (
                  <div className="ml-3 text-left">
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                  </div>
                )}
              </div>
              {isSidebarOpen && <ChevronDown className="w-4 h-4" />}
            </button>

            {/* User Menu Items */}
            {isUserMenuOpen && isSidebarOpen && (
              <div className="mt-2 space-y-1">
                {userMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-primary hover:text-gray-900 dark:hover:text-gray-300"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {/* Handle logout */}}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'lg:pl-64' : 'lg:pl-16'
      }`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 bg-white dark:bg-dark-mid border-b border-gray-200 dark:border-dark-primary sm:px-6">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-400 dark:text-gray-500 bg-white dark:bg-dark-mid rounded-md hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSidebarOpen ? <ChevronsLeft className="w-5 h-5" /> : <ChevronsRight className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center px-3 py-1.5 text-sm text-gray-400 dark:text-gray-500 bg-white dark:bg-dark-primary border border-gray-300 dark:border-dark-secondary rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline italic">Search...</span>
              <span className="hidden sm:inline ml-4">
                <kbd className="px-1.5 py-0.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-primary border border-gray-200 dark:border-dark-secondary rounded">
                  <Command className="inline-block w-3 h-3 mr-1" />K
                </kbd>
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full ${theme === 'dark' ? 'bg-dark-primary' : ''}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 relative text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full ${theme === 'dark' ? 'bg-dark-primary' : ''}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {isNotificationsOpen && (
                <NotificationsDropdown 
                  isOpen={isNotificationsOpen}
                  onClose={() => setNotificationsOpen(false)}
                />
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* Global Search */}
      {isSearchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </div>
  );
}

export default Layout;