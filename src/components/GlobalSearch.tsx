import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, X, Users, Plane, Calendar, Building2,
  ChevronRight, Command, MapPin, CreditCard
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'traveler' | 'trip' | 'vendor' | 'policy';
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  url: string;
}

interface GlobalSearchProps {
  onClose: () => void;
}

const mockSearchResults: SearchResult[] = [
  {
    id: 'T001',
    type: 'traveler',
    title: 'Sarah Wilson',
    subtitle: 'Sales Director · Active Trip',
    icon: <Users className="w-4 h-4" />,
    url: '/travelers/T001'
  },
  {
    id: 'TRIP-2024-001',
    type: 'trip',
    title: 'London Sales Conference',
    subtitle: 'Mar 15-20, 2024 · Sarah Wilson',
    icon: <Plane className="w-4 h-4" />,
    url: '/trips/TRIP-2024-001'
  },
  {
    id: 'V001',
    type: 'vendor',
    title: 'United Airlines',
    subtitle: 'Corporate Rate Code: UA2024',
    icon: <Building2 className="w-4 h-4" />,
    url: '/vendors/V001'
  }
];

const recentSearches: SearchResult[] = [
  {
    id: 'T002',
    type: 'traveler',
    title: 'Michael Chen',
    subtitle: 'Engineering · Last viewed 2h ago',
    icon: <Users className="w-4 h-4" />,
    url: '/travelers/T002'
  },
  {
    id: 'TRIP-2024-002',
    type: 'trip',
    title: 'Singapore Tech Summit',
    subtitle: 'Apr 5-10, 2024 · Active',
    icon: <Plane className="w-4 h-4" />,
    url: '/trips/TRIP-2024-002'
  }
];

const quickLinks = [
  { title: 'Book New Trip', icon: <Calendar className="w-4 h-4" />, url: '/book' },
  { title: 'Active Travelers Map', icon: <MapPin className="w-4 h-4" />, url: '/' },
  { title: 'Travel Policy', icon: <CreditCard className="w-4 h-4" />, url: '/policy' }
];

export default function GlobalSearch({ onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    // Simulate search results
    if (query) {
      const filtered = mockSearchResults.filter(
        result => 
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="relative min-h-full flex items-start justify-center p-4 sm:p-6">
        <div
          ref={searchRef}
          className="relative w-full max-w-2xl mt-20 bg-white dark:bg-dark-mid rounded-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
        >
          {/* Search Input */}
          <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-dark-primary">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              className="flex-1 ml-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="Search travelers, trips, vendors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-primary border border-gray-200 dark:border-dark-secondary rounded">
                <Command className="w-3 h-3 mr-1" />K
              </kbd>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-[32rem] overflow-y-auto">
            {/* Quick Links */}
            {!query && (
              <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-primary">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quick Links
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {quickLinks.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        navigate(link.url);
                        onClose();
                      }}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-dark-primary"
                    >
                      {link.icon}
                      <span className="ml-2">{link.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {!query && (
              <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-primary">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Recent Searches
                </h3>
                <div className="mt-2 space-y-1">
                  {recentSearches.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-dark-primary"
                    >
                      <span className="flex-shrink-0 text-gray-400 dark:text-gray-500">
                        {result.icon}
                      </span>
                      <div className="ml-3 flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{result.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{result.subtitle}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && (
              <div className="py-3">
                {results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((result, index) => (
                      <button
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        className={`w-full flex items-center px-4 py-2 text-sm ${
                          selectedIndex === index
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-primary'
                        }`}
                      >
                        <span className={`flex-shrink-0 ${
                          selectedIndex === index ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {result.icon}
                        </span>
                        <div className="ml-3 flex-1 text-left">
                          <p className="font-medium text-inherit">{result.title}</p>
                          <p className={`text-xs ${
                            selectedIndex === index ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {result.subtitle}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${
                          selectedIndex === index ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                        }`} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No results found for "{query}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}