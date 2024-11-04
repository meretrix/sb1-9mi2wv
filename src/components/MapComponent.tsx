import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWVyZXRyaXgiLCJhIjoiY20yeHB1d292MDdiZzJrcHg1ZDVqamVscCJ9.GZP8JbxHS2cGWuYaX3GiQQ';

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{
    position: [number, number];
    label?: string;
  }>;
  className?: string;
}

export function MapComponent({ center, zoom, markers = [], className = '' }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: zoom
    });

    const mapInstance = map.current;

    mapInstance.on('load', () => {
      // Add markers
      markers.forEach(marker => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
        el.style.backgroundSize = 'cover';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';

        // Add popup if label exists
        if (marker.label) {
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setText(marker.label);

          new mapboxgl.Marker(el)
            .setLngLat(marker.position)
            .setPopup(popup)
            .addTo(mapInstance);
        } else {
          new mapboxgl.Marker(el)
            .setLngLat(marker.position)
            .addTo(mapInstance);
        }
      });

      // Add navigation control
      mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
    });

    return () => {
      mapInstance.remove();
    };
  }, [center, zoom, markers]);

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}