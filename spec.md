# Specification

## Summary
**Goal:** Build a live location tracker web application that displays the user's real-time GPS position on an interactive map.

**Planned changes:**
- Integrate Leaflet.js (v1.9.4) with OpenStreetMap tiles to render a full-screen interactive map
- Implement continuous browser Geolocation API tracking with auto-centering at zoom level 16
- Display a blue marker at the user's location that updates in real-time as they move
- Add a status overlay box at top-right showing tracking status and live latitude/longitude coordinates (5 decimal places)
- Apply clean, minimal design with white UI elements, sans-serif typography, and subtle shadows

**User-visible outcome:** Users can open the application, grant location permission, and see their real-time position tracked on an interactive map with live coordinates displayed in a status box.
