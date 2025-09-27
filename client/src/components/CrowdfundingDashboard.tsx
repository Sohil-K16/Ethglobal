import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { 
  useGetCampaigns, 
  useGetCampaignCount, 
  createCampaign,
  donateToCampaign,
  formatCampaignData,
  getRemainingDays,
  getProgressPercentage,
  type Campaign
} from "../hooks/useCrowdfunding";

export function CrowdfundingDashboard() {
  const account = useActiveAccount();
  const [activeTab, setActiveTab] = useState<"create" | "campaigns">("campaigns");
  
  const { campaigns, isLoading: campaignsLoading } = useGetCampaigns();
  useGetCampaignCount();

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
      {activeTab === "campaigns" && <CampaignsList campaigns={campaigns} isLoading={campaignsLoading} />}
      {activeTab === "create" && <CreateCampaign account={account} />}
    </div>
  );
}

function CampaignsList({ campaigns, isLoading }: { readonly campaigns: readonly any[], readonly isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Active Campaigns</h2>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Active Campaigns</h2>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-white mb-2">No campaigns yet!</h3>
          <p className="text-gray-400 mb-6">Be the first to create a crowdfunding campaign</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Active Campaigns ({campaigns.length})</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => {
          const formatted = formatCampaignData(campaign);
          const progress = getProgressPercentage(formatted.amountCollected, formatted.target);
          const remainingDays = getRemainingDays(formatted.deadline);
          // Use campaign.owner + deadline as a unique key (adjust if you have a better unique id)
          const uniqueKey = `${formatted.owner}-${formatted.deadline}`;
          
          return (
            <CampaignCard 
              key={uniqueKey} 
              campaign={formatted} 
              campaignId={index}
              progress={progress}
              remainingDays={remainingDays}
            />
          );
        })}
      </div>
    </div>
  );
}

function CampaignCard({ 
  campaign, 
  campaignId, 
  progress, 
  remainingDays 
}: { 
  readonly campaign: Campaign, 
  readonly campaignId: number, 
  readonly progress: number, 
  readonly remainingDays: number 
}) {
  const account = useActiveAccount();
  const [donationAmount, setDonationAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    if (!account || !donationAmount) return;
    
    setIsLoading(true);
    try {
      await donateToCampaign(account, campaignId, donationAmount);
      setDonationAmount("");
      alert("Donation successful! 🎉");
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Donation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-colors">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">{campaign.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">{campaign.description}</p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Progress</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>{campaign.amountCollected} ETH raised</span>
          <span>of {campaign.target} ETH</span>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>👥 {campaign.donators.length} backers</span>
        <span>📅 {remainingDays > 0 ? `${remainingDays} days left` : "Expired"}</span>
      </div>

      <div className="space-y-3">
        <div className="flex space-x-2">
          <input
            type="number"
            step="0.01"
            placeholder="0.1 ETH"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="flex-1 px-3 py-2 bg-black/40 border border-gray-600 rounded text-white text-sm"
          />
          <button
            onClick={handleDonate}
            disabled={!account || !donationAmount || isLoading || remainingDays <= 0}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
          >
            {isLoading ? "..." : "💝 Donate"}
          </button>
        </div>
        
        <p className="text-xs text-gray-500">
          Owner: {campaign.owner.substring(0, 6)}...{campaign.owner.substring(38)}
        </p>
      </div>
    </div>
  );
}

function CreateCampaign({ account }: { readonly account: any }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;

    setIsLoading(true);
    try {
      const result = await createCampaign(
        account,
        formData.title,
        formData.description,
        formData.target,
        formData.deadline,
        formData.image || ""
      );
      
      console.log("Campaign created:", result);
      alert("🎉 Campaign created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        target: "",
        deadline: "",
        image: "",
      });
    } catch (error) {
      console.error("Failed to create campaign:", error);
      alert("❌ Failed to create campaign. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Campaign</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="campaign-title" className="block text-sm font-medium text-gray-300 mb-2">
            Campaign Title
          </label>
          <input
            id="campaign-title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            placeholder="Enter your campaign title"
            required
          />
        </div>

        <div>
          <label htmlFor="campaign-description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="campaign-description"
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
            <label htmlFor="target-amount" className="block text-sm font-medium text-gray-300 mb-2">
              Target Amount (ETH)
            </label>
            <input
              id="target-amount"
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
            <label htmlFor="campaign-deadline" className="block text-sm font-medium text-gray-300 mb-2">
              Deadline
            </label>
            <input
              id="campaign-deadline"
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
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          {isLoading ? "🔄 Creating..." : "🚀 Create Campaign"}
        </button>
      </form>

      <div className="mt-8 p-4 bg-green-900/30 border border-green-700/50 rounded-lg">
        <p className="text-green-300 text-sm">
          <strong>✅ Live on Sepolia:</strong> Your campaigns will be created on-chain and are fully functional!
        </p>
      </div>
    </div>
  );
}