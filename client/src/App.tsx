import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { StateContextProvider } from './context';
import { Container } from './components/ui/Layout';

export function App() {
  return (
    <StateContextProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
          {/* Background Pattern */}
          <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzliNWNmNiIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iNCIvPgo8L2c+CjwvZz4KPHN2Zz4=')] opacity-40"></div>
          
          {/* Main Layout */}
          <div className="relative flex min-h-screen">
            {/* Sidebar */}
            <div className="hidden lg:flex lg:w-20 xl:w-24 relative z-10">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 relative z-10">
              <div className="sticky top-0 z-20 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
                <Container size="full" className="py-4">
                  <Navbar />
                </Container>
              </div>

              <main className="relative">
                <Container size="xl" className="py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-campaign" element={<CreateCampaign />} />
                    <Route path="/campaign-details/:id" element={<CampaignDetails />} />
                  </Routes>
                </Container>
              </main>

              {/* Footer */}
              <footer className="relative z-10 mt-auto">
                <Container size="xl" className="py-8">
                  <div className="border-t border-gray-800/50 pt-8">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <span>Powered by</span>
                        <span className="text-purple-400 font-semibold">Web3 Technology</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Contract: <code className="bg-gray-800/50 px-2 py-1 rounded text-purple-300">0xF4F21769b98c3D8192D699675F31a4d6e8979bC6</code>
                      </p>
                    </div>
                  </div>
                </Container>
              </footer>
            </div>
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
