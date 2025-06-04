"use client"

import React from 'react';
import GetInfo from './getinfo';

const SidePanel: React.FC = () => {
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
      <p><GetInfo/></p>
    </div>
  );
};

export default SidePanel;

