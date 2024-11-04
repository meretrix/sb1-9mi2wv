import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface FlightMapProps {
  origin: [number, number];
  destination: [number, number];
  className?: string;
}

export default function FlightMap({ origin, destination, className = '' }: FlightMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Calculate the center point and zoom level to show both points
    const bounds = new mapboxgl.LngLatBounds(origin, destination);
    const center = bounds.getCenter();

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [center.lng, center.lat],
      zoom: 2
    });

    const mapInstance = map.current;

    mapInstance.on('load', () => {
      // Add origin and destination markers
      new mapboxgl.Marker({ color: '#3B82F6' })
        .setLngLat(origin)
        .addTo(mapInstance);

      new mapboxgl.Marker({ color: '#3B82F6' })
        .setLngLat(destination)
        .addTo(mapInstance);

      // Add the great circle line
      const route = {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': [origin, destination]
          }
        }]
      };

      mapInstance.addSource('route', {
        'type': 'geojson',
        'data': route
      });

      mapInstance.addLayer({
        'id': 'route',
        'source': 'route',
        'type': 'line',
        'paint': {
          'line-color': '#3B82F6',
          'line-width': 2,
          'line-dasharray': [2, 1]
        }
      });

      // Fit bounds with padding
      mapInstance.fitBounds(bounds, {
        padding: 50,
        duration: 0
      });
    });

    return () => {
      mapInstance.remove();
    };
  }, [origin, destination]);

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}