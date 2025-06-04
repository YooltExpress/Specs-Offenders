import React from 'react';
import Map from './Map';

const App: React.FC = () => {
  const initialCenter: [number, number] = [40.7608, -111.8910];
  const initialZoom: number = 13;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>My OpenStreetMap Application</h1>
      <p>Displaying Salt Lake City using OpenStreetMap data.</p>
      <Map center={initialCenter} zoom={initialZoom} />
    </div>
  );
};

export default App;