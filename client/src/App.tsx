import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { sepolia } from "./config/thirdweb";
import { CrowdfundingDashboard } from "./components/CrowdfundingDashboard";

export function App() {
	return (
		<main className="min-h-[100vh] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
			<div className="container mx-auto px-4 py-8">
				<Header />
				
				<div className="flex justify-center mb-8">
					<ConnectButton
						client={client}
						chain={sepolia}
						appMetadata={{
							name: "CrowdFunding DApp",
							url: "https://github.com/Sohil-K16/Ethglobal",
							description: "Decentralized Crowdfunding Platform",
						}}
					/>
				</div>

				<CrowdfundingDashboard />
			</div>
		</main>
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
