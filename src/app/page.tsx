"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import SidePanel from './sidepanel';
import SearchBar from './searchbar'

// Dynamically import the Map component with ssr disabled
const Map = dynamic(() => import('./Map'), {
  ssr: false, // This will disable server-side rendering for this component
  loading: () => <div>Loading map...</div>
});

const App: React.FC = () => {
  const initialCenter: [number, number] = [40.7608, -111.8910];
  const initialZoom: number = 13;

  return (
  <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
    <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", zIndex: 2000}}>
      <SearchBar />
    </div>
    <Map center={initialCenter} zoom={initialZoom} />
    <div style={{ position: "absolute", top: 0, right: 0, height: "100vh", zIndex: 1000 }}>
      <SidePanel />
    </div>
  </div>
);
};

export default App;