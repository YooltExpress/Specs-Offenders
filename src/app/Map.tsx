"use client"

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapProps {
  center: [number, number]; // LAT, LON
  zoom: number;
}

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  const [mapKey, setMapKey] = useState(Date.now());
  const [pinPosition, setPinPosition] = useState<[number, number] | null>(null);
  const [locationName, setLocationName] = useState<string>('New York'); // Default location name

  // Function to drop a pin at a given location
  const dropPinAtLocation = (location: string) => {
    // Geocode the location name into lat/lng using Nominatim API
    fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          setPinPosition([lat, lng]); // Set the pin's position
        } else {
          alert('Location not found!');
        }
      })
      .catch(error => {
        console.error('Error fetching geolocation:', error);
      });
  };

  // Custom component to handle map events
  function DropPin() {
    const map = useMap();

    useEffect(() => {
      // Drop a pin at the default location (e.g., "New York")
      dropPinAtLocation(locationName);

      // Optionally, if you want to add behavior for user clicks
      const onClickHandler = (e: any) => {
        const { lat, lng } = e.latlng;
        setPinPosition([lat, lng]); // Drop pin where the user clicks
      };

      map.on('click', onClickHandler);

      return () => {
        map.off('click', onClickHandler); // Clean up the event listener
      };
    }, [map, locationName]);

    return pinPosition ? (
      <Marker position={pinPosition}>
        <Popup>
          Dropped Pin<br />
          Lat: {pinPosition[0].toFixed(4)}, Lng: {pinPosition[1].toFixed(4)}
        </Popup>
      </Marker>
    ) : null;
  }

  // Clean up the map instance when component unmounts
  useEffect(() => {
    return () => {
      const mapElements = document.querySelectorAll('.leaflet-container');
      mapElements.forEach(el => {
        // @ts-ignore - accessing private property
        if (el._leaflet_id) {
          // @ts-ignore - accessing private property
          delete el._leaflet_id;
        }
      });
    };
  }, []);

  return (
    <div>
      {/* Input to enter the location name */}
      <input
        type="text"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
        placeholder="Enter a location name"
      />
      <button onClick={() => dropPinAtLocation(locationName)}>Drop Pin</button>

      <MapContainer
        key={mapKey}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DropPin />
      </MapContainer>
    </div>
  );
};

export default Map;
