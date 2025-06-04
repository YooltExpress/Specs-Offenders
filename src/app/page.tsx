"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import SidePanel from './sidepanel';

// Dynamically import the Map component with ssr disabled
const Map = dynamic(() => import('./Map'), {
  ssr: false, // This will disable server-side rendering for this component
  loading: () => <div>Loading map...</div>
});

const App: React.FC = () => {
  const initialCenter: [number, number] = [40.7608, -111.8910];
  const initialZoom: number = 13;

  return (
  <div style={{ display: "flex", flexDirection: "row-reverse", height: "100vh", width: "100vw", textAlign: "center" }}>
    <SidePanel />
    <div style={{ flex: 1 }}>
      <Map center={initialCenter} zoom={initialZoom} />
    </div>
  </div>
);
};

export default App;