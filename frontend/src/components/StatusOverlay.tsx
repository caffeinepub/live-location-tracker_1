import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import type { GeolocationStatus } from '../hooks/useGeolocation';

interface StatusOverlayProps {
  status: GeolocationStatus;
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export default function StatusOverlay({ status, latitude, longitude, error }: StatusOverlayProps) {
  const getStatusText = () => {
    switch (status) {
      case 'waiting':
        return 'Waiting for permission...';
      case 'active':
        return 'Tracking Active';
      case 'error':
        return `Error: ${error || 'Location denied'}`;
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'waiting':
        return <MapPin className="h-5 w-5 text-muted-foreground animate-pulse" />;
      case 'active':
        return <Navigation className="h-5 w-5 text-primary" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'text-primary';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-card/95 backdrop-blur-sm rounded-lg shadow-lg border border-border p-4 min-w-[280px]">
      <div className="flex items-center gap-2 mb-3">
        {getStatusIcon()}
        <h3 className="text-lg font-semibold text-foreground">Location Tracker</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground font-medium min-w-[60px]">Status:</span>
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-medium min-w-[60px]">Lat:</span>
          <span className="font-mono text-foreground">
            {latitude !== null ? latitude.toFixed(5) : '0.00000'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-medium min-w-[60px]">Lon:</span>
          <span className="font-mono text-foreground">
            {longitude !== null ? longitude.toFixed(5) : '0.00000'}
          </span>
        </div>
      </div>
    </div>
  );
}
