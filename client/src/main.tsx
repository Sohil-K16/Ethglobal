import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import "./index.css";

console.log("🚀 Loading CrowdFunding DApp...");
console.log("Environment variables:", {
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID ? "✅ Present" : "❌ Missing",
  infuraKey: import.meta.env.VITE_INFURA_API_KEY ? "✅ Present" : "❌ Missing",
  mode: import.meta.env.MODE
});

try {
  const rootElement = document.getElementById("root");
  console.log("Root element found:", !!rootElement);
  
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  createRoot(rootElement).render(
    <React.StrictMode>
      <ThirdwebProvider>
        <App />
      </ThirdwebProvider>
    </React.StrictMode>
  );
  
  console.log("✅ App rendered successfully");
} catch (error) {
  console.error("❌ Error rendering app:", error);
  
  // Fallback rendering
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: #d00;">CrowdFunding DApp - Error</h1>
      <p>There was an error loading the application:</p>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${error}</pre>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
}
