import { useEffect, useRef } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import StatusOverlay from './components/StatusOverlay';
import Footer from './components/Footer';

// Declare Leaflet types for TypeScript
declare global {
  interface Window {
    L: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
  const { status, latitude, longitude, error } = useGeolocation();

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    
    // Wait for Leaflet to be available
    const initMap = () => {
      if (typeof window.L === 'undefined') {
        setTimeout(initMap, 100);
        return;
      }

      // Initialize the map with a default view
      const map = window.L.map(mapRef.current).setView([0, 0], 2);

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      mapInstanceRef.current = map;

      // Set up location tracking
      map.on('locationfound', (e: any) => {
        const latlng = e.latlng;
        
        // Update or create marker
        if (markerRef.current) {
          markerRef.current.setLatLng(latlng);
        } else {
          markerRef.current = window.L.marker(latlng).addTo(map);
          markerRef.current.bindPopup("You are here").openPopup();
          map.setView(latlng, 16);
        }
      });

      map.on('locationerror', (e: any) => {
        console.error('Location error:', e.message);
      });

      // Start watching location
      map.locate({ setView: true, maxZoom: 16, watch: true, enableHighAccuracy: true });
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Update map view when location changes
  useEffect(() => {
    if (mapInstanceRef.current && latitude !== null && longitude !== null && markerRef.current) {
      const latlng = window.L.latLng(latitude, longitude);
      markerRef.current.setLatLng(latlng);
    }
  }, [latitude, longitude]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div ref={mapRef} className="map-container" />
      <StatusOverlay 
        status={status}
        latitude={latitude}
        longitude={longitude}
        error={error}
      />
      <Footer />
    </div>
  );
}

export default App;
