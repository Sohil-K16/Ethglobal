import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { client, sepolia, CROWDFUNDING_CONTRACT_ADDRESS } from "../config/thirdweb";

export function CrowdfundingDashboard() {
  const account = useActiveAccount();
  const [activeTab, setActiveTab] = useState<"create" | "campaigns">("campaigns");

  const contract = getContract({
    client,
    chain: sepolia,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
  });

  if (!account) {
    return (
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Welcome to CrowdFunding DApp
        </h2>
        <p className="text-gray-300 mb-6">
          Connect your wallet to start creating campaigns or supporting existing ones!
        </p>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="bg-purple-900/50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-300 mb-2">✨ Create Campaigns</h3>
            <p className="text-gray-400">Launch your fundraising campaign with custom goals and deadlines</p>
          </div>
          <div className="bg-blue-900/50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-300 mb-2">💰 Support Projects</h3>
            <p className="text-gray-400">Discover and fund innovative projects from creators worldwide</p>
          </div>
          <div className="bg-green-900/50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-300 mb-2">🔒 Secure & Transparent</h3>
            <p className="text-gray-400">All transactions are secured by smart contracts on Ethereum</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`pb-2 px-4 font-semibold transition-colors ${
            activeTab === "campaigns"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          📋 All Campaigns
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`pb-2 px-4 font-semibold transition-colors ${
            activeTab === "create"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          ➕ Create Campaign
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "campaigns" && <CampaignsList contract={contract} />}
      {activeTab === "create" && <CreateCampaign contract={contract} />}
    </div>
  );
}

function CampaignsList({ contract }: { contract: any }) {
  // This would typically fetch campaigns from the contract
  // For now, showing a placeholder
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Active Campaigns</h2>
      
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-xl font-semibold text-white mb-2">No campaigns yet!</h3>
        <p className="text-gray-400 mb-6">Be the first to create a crowdfunding campaign</p>
        <button
          onClick={() => {}} // This would switch to create tab
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Create First Campaign
        </button>
      </div>
    </div>
  );
}

function CreateCampaign({ contract }: { contract: any }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This would call the smart contract to create a campaign
    console.log("Creating campaign:", formData);
    alert("Campaign creation coming soon! Smart contract integration in progress.");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Campaign</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Campaign Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            placeholder="Enter your campaign title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            placeholder="Describe your campaign and what you're raising funds for"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Amount (ETH)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.target}
              onChange={(e) => setFormData(prev => ({ ...prev, target: e.target.value }))}
              className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="0.1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Deadline
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
        >
          🚀 Create Campaign
        </button>
      </form>

      <div className="mt-8 p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
        <p className="text-yellow-300 text-sm">
          <strong>Note:</strong> This is a demo interface. Smart contract integration for creating campaigns is coming in the next update!
        </p>
      </div>
    </div>
  );
}