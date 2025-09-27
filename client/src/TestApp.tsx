import React from "react";

export function TestApp() {
  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#1a1a1a",
      color: "white",
      minHeight: "100vh"
    }}>
      <h1 style={{ color: "#4CAF50" }}>🚀 CrowdFunding DApp - Test Mode</h1>
      <p>If you can see this, React is working!</p>
      
      <div style={{ 
        marginTop: "20px", 
        padding: "15px", 
        backgroundColor: "#333", 
        borderRadius: "8px" 
      }}>
        <h2>System Status:</h2>
        <p>✅ React is rendering</p>
        <p>✅ Vite is serving files</p>
        <p>✅ JavaScript is executing</p>
      </div>

      <div style={{ 
        marginTop: "20px", 
        padding: "15px", 
        backgroundColor: "#2a2a2a", 
        borderRadius: "8px" 
      }}>
        <h3>Environment Info:</h3>
        <p>Mode: {import.meta.env.MODE}</p>
        <p>Base URL: {import.meta.env.BASE_URL}</p>
        <p>Development: {import.meta.env.DEV ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}