"use client"

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Map component with ssr disabled
const Map = dynamic(() => import('./Map'), {
  ssr: false, // This will disable server-side rendering for this component
  loading: () => <div>Loading map...</div>
});

const App: React.FC = () => {
  const initialCenter: [number, number] = [40.7608, -111.8910];
  const initialZoom: number = 13;

  return (
    <div style={{ textAlign: 'center' }}>
      <Map center={initialCenter} zoom={initialZoom} />
    </div>
  );
};

export default App;