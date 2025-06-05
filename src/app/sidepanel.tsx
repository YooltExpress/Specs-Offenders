"use client"

import React, { useState } from 'react';
import GetInfo from './getinfo';


const SidePanel: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>("");
  return (
    <div style={{
    width: "300px",
    height: "400px",
    background: "#f4f4f4",
    borderLeft: "1px solid #ddd",
    padding: "1rem",
    boxSizing: "border-box",
    position: "absolute",
    right: "100px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1000,
    borderRadius: "10px"
}}>
      <h2>Side Panel</h2>
      <GetInfo/>
        
    <div style={{ marginTop: '2rem' }}>
      <label htmlFor="calendar" style={{ display: 'block', marginBottom: '0.5rem' }}>Select a date:</label>
      <input
        type="date"
        id="calendar"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      {selectedDate && (
        <div style={{ marginTop: '1rem', color: '#333' }}>
          Selected date: {selectedDate}
        </div>
      )}
    </div>
  </div>
  );
};

export default SidePanel;

