"use client"

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
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
  // Use a state to generate a unique key for the MapContainer
  const [mapKey, setMapKey] = useState(Date.now());
  const [pinPosition, setPinPosition] = useState<[number, number] | null>(null);
function DropPin() {
  useMapEvents({
    click(e) {
      setPinPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

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
      // This will help clean up any map instances when the component unmounts
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
      {/* Example Marker */}
      {/* <Marker position={center}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
    </Marker> */}
    <DropPin />
    </MapContainer>
  );
};

export default Map;