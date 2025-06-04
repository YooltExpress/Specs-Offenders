import React from 'react';
import Map from './Map';

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