"use client"

import React from 'react';

const SidePanel: React.FC = () => {
  return (
    <div style={{
      width: "300px",
      height: "100vh",
      background: "#f4f4f4",
      borderRight: "1px solid #ddd",
      padding: "1rem",
      boxSizing: "border-box"
    }}>
      <h2>Side Panel</h2>
      <p>Put your content here.</p>
    </div>
  );
};

export default SidePanel;

