import { useState, useEffect } from 'react';

export type GeolocationStatus = 'waiting' | 'active' | 'error';

interface GeolocationState {
  status: GeolocationStatus;
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: 'waiting',
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        status: 'error',
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by your browser',
      });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          status: 'active',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        let errorMessage = 'Location denied';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }

        setState({
          status: 'error',
          latitude: null,
          longitude: null,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
}
