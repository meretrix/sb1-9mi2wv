import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '../contexts/ThemeContext';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWVyZXRyaXgiLCJhIjoiY20yeHB1d292MDdiZzJrcHg1ZDVqamVscCJ9.GZP8JbxHS2cGWuYaX3GiQQ';

interface Traveler {
  id: number;
  name: string;
  location: [number, number];
  status: string;
}

const travelers: Traveler[] = [
  { id: 1, name: 'John Doe', location: [-74.006, 40.7128], status: 'active' }, // New York
  { id: 2, name: 'Jane Smith', location: [-0.1276, 51.5074], status: 'active' }, // London
  { id: 3, name: 'Mike Johnson', location: [139.6917, 35.6895], status: 'active' }, // Tokyo
  { id: 4, name: 'Sarah Wilson', location: [2.3522, 48.8566], status: 'active' }, // Paris
  { id: 5, name: 'David Chen', location: [103.8198, 1.3521], status: 'active' }, // Singapore
];

function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === 'dark' 
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11',
      center: [-40, 35],
      zoom: 1.5,
      projection: 'globe'
    });

    const mapInstance = map.current;

    mapInstance.on('load', () => {
      // Add atmosphere and glow effects
      mapInstance.setFog({
        'color': theme === 'dark' ? 'rgb(23, 25, 29)' : 'rgb(255, 255, 255)',
        'high-color': theme === 'dark' ? 'rgb(36, 37, 42)' : 'rgb(200, 220, 255)',
        'horizon-blend': 0.2,
        'space-color': theme === 'dark' ? 'rgb(25, 28, 34)' : 'rgb(100, 150, 255)',
        'star-intensity': theme === 'dark' ? 0.8 : 0.6
      });

      // Add navigation control
      mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each traveler
      travelers.forEach((traveler) => {
        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'traveler-marker';
        markerEl.innerHTML = `
          <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg pulse-animation"></div>
        `;

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          className: theme === 'dark' ? 'custom-popup dark' : 'custom-popup'
        }).setHTML(`
          <div class="p-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}">
            <p class="font-semibold text-sm">${traveler.name}</p>
            <p class="text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}">Status: ${traveler.status}</p>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(markerEl)
          .setLngLat(traveler.location)
          .setPopup(popup)
          .addTo(mapInstance);
      });
    });

    // Cleanup
    return () => {
      mapInstance.remove();
    };
  }, [theme]);

  // Update map style when theme changes
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(
        theme === 'dark'
          ? 'mapbox://styles/mapbox/dark-v11'
          : 'mapbox://styles/mapbox/light-v11'
      );
    }
  }, [theme]);

  return (
    <div className="relative w-full h-full">
      <style>{`
        .traveler-marker {
          cursor: pointer;
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .custom-popup .mapboxgl-popup-content {
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .custom-popup.dark .mapboxgl-popup-content {
          background: #1F2532;
          color: white;
        }

        .custom-popup .mapboxgl-popup-tip {
          border-top-color: white;
        }

        .custom-popup.dark .mapboxgl-popup-tip {
          border-top-color: #1F2532;
        }

        .mapboxgl-canvas {
          border-radius: 0.5rem;
        }

        .mapboxgl-ctrl-group {
          background-color: ${theme === 'dark' ? '#1F2532' : 'white'} !important;
        }

        .mapboxgl-ctrl-group button {
          color: ${theme === 'dark' ? '#7C808A' : '#666'} !important;
        }

        .mapboxgl-ctrl-group button:hover {
          background-color: ${theme === 'dark' ? '#161A24' : '#f5f5f5'} !important;
        }
      `}</style>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
}

export default Map;