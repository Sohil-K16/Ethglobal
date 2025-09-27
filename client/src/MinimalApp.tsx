import React from "react";

export function MinimalApp() {
  console.log("MinimalApp rendering...");
  
  return (
    <div className="min-h-screen bg-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          🚀 CrowdFunding DApp
        </h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Welcome to the Decentralized Crowdfunding Platform
          </h2>
          
          <p className="text-gray-300 mb-6">
            This is a minimal version to test if the app loads correctly.
          </p>
          
          <div className="space-y-2 text-sm text-gray-400">
            <p>✅ React is working</p>
            <p>✅ Tailwind CSS is working</p>
            <p>✅ App structure is loading</p>
          </div>
          
          <button 
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            onClick={() => alert("Button clicked! App is interactive.")}
          >
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}