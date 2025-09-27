import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { StateContextProvider } from './context';

export function App() {
  return (
    <StateContextProvider>
      <Router>
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>

          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </StateContextProvider>
  );
}

function Header() {
	return (
		<header className="text-center mb-12">
			<div className="mb-6">
				<h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
					🚀 CrowdFunding{" "}
					<span className="text-purple-400">DApp</span>
				</h1>
				<p className="text-xl text-gray-300">
					Decentralized Crowdfunding Platform on Sepolia
				</p>
			</div>
			
			<div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
				<p className="text-sm text-gray-400 mb-2">
					Contract Address: <code className="bg-black/40 px-2 py-1 rounded text-purple-300">0xF4F21769b98c3D8192D699675F31a4d6e8979bC6</code>
				</p>
				<p className="text-sm text-gray-400">
					Network: <span className="text-green-400 font-semibold">Sepolia Testnet ✅</span>
				</p>
			</div>
		</header>
	);
}
