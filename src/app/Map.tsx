"use client"

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

interface MapProps {
  center: [number, number]; // LAT, LON
  zoom: number;
}

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);

  function LocationPin() {
    useMapEvents({
      click(e) {
        setClickedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return clickedPosition ? (
      <Pin position={clickedPosition}>
        <Popup>You clicked here: <br /> Lat: {clickedPosition[0].toFixed(4)}, Lng: {clickedPosition[1].toFixed(4)}</Popup>
      </Pin>
    ) : null;
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* LocationPin component/handler here */}
      <LocationPin />
    </MapContainer>
  );
};

export default Map;