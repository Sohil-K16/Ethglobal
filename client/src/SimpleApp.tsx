import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple Home component without context dependencies
function SimpleHome() {
  return (
    <div className="bg-[#13131a] min-h-screen text-white p-8">
      <h1 className="text-4xl font-bold mb-8">🚀 CrowdFunding DApp</h1>
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <p className="text-gray-300 mb-6">
          Your decentralized crowdfunding platform is working!
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-purple-900/50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-300 mb-2">✨ Create Campaigns</h3>
            <p className="text-gray-400">Launch your fundraising campaigns</p>
          </div>
          <div className="bg-blue-900/50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-300 mb-2">💰 Support Projects</h3>
            <p className="text-gray-400">Fund innovative projects</p>
          </div>
          <div className="bg-green-900/50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-300 mb-2">🔒 Secure</h3>
            <p className="text-gray-400">Powered by smart contracts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple navigation
function SimpleNav() {
  return (
    <nav className="bg-black/30 p-4 mb-8 rounded-lg">
      <div className="flex space-x-6">
        <a href="/" className="text-purple-400 hover:text-purple-300">🏠 Home</a>
        <a href="/profile" className="text-gray-400 hover:text-white">👤 Profile</a>
        <a href="/create-campaign" className="text-gray-400 hover:text-white">➕ Create</a>
      </div>
    </nav>
  );
}

export function SimpleApp() {
  console.log("SimpleApp is rendering...");
  
  return (
    <Router>
      <div className="bg-[#13131a] min-h-screen">
        <div className="container mx-auto px-4">
          <SimpleNav />
          <Routes>
            <Route path="/" element={<SimpleHome />} />
            <Route path="/profile" element={<div className="text-white p-8">Profile Page</div>} />
            <Route path="/create-campaign" element={<div className="text-white p-8">Create Campaign</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}