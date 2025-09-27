import React from "react";

export function SimpleApp() {
  console.log("SimpleApp is rendering...");
  
  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <h1 style={{ color: "#333", fontSize: "24px" }}>🚀 CrowdFunding DApp Test</h1>
      <p style={{ color: "#666" }}>If you can see this, React is working!</p>
      
      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "white", borderRadius: "8px" }}>
        <h2>Environment Check:</h2>
        <p>Client ID: {import.meta.env.VITE_THIRDWEB_CLIENT_ID ? "✅ Found" : "❌ Missing"}</p>
        <p>Infura API: {import.meta.env.VITE_INFURA_API_KEY ? "✅ Found" : "❌ Missing"}</p>
        <p>Contract Address: {import.meta.env.VITE_CROWDFUNDING_CONTRACT_ADDRESS ? "✅ Found" : "❌ Missing"}</p>
      </div>
      
      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#e8f4f8", borderRadius: "8px" }}>
        <h3>Debug Info:</h3>
        <p>Node Environment: {import.meta.env.MODE}</p>
        <p>Base URL: {import.meta.env.BASE_URL}</p>
        <p>Development: {import.meta.env.DEV ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}