import React from 'react';


const App: React.FC = () => {
  const initialCenter: [number, number] = [40.7608, -111.8910];
  const initialZoom: number = 13;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      Hello World.
    </div>
  );
};

export default App;