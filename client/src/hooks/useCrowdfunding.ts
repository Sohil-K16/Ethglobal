import { useReadContract } from "thirdweb/react";
import { prepareContractCall, sendTransaction, getContract } from "thirdweb";
import { client, sepolia, CROWDFUNDING_CONTRACT_ADDRESS } from "../config/thirdweb";

// Simple utility functions for Wei conversion
function parseEther(value: string): bigint {
  return BigInt(Math.floor(parseFloat(value) * 1e18));
}

function formatEther(wei: bigint | string): string {
  const weiValue = typeof wei === 'string' ? BigInt(wei) : wei;
  return (Number(weiValue) / 1e18).toString();
}

// Contract instance
export const contract = getContract({
  client,
  chain: sepolia,
  address: CROWDFUNDING_CONTRACT_ADDRESS,
});

// Campaign interface matching the Solidity struct
export interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string; // bigint as string
  deadline: string; // bigint as string
  amountCollected: string; // bigint as string
  image: string;
  donators: string[];
  donations: string[]; // bigint[] as string[]
}

// Hook to get all campaigns
export function useGetCampaigns() {
  const { data: campaigns, isLoading, error } = useReadContract({
    contract,
    method: "function getCampaigns() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations)[])",
    params: [],
  });

  return {
    campaigns: campaigns || [],
    isLoading,
    error,
  };
}

// Hook to get campaign count
export function useGetCampaignCount() {
  const { data: count, isLoading } = useReadContract({
    contract,
    method: "function numberOfCampaigns() view returns (uint256)",
    params: [],
  });

  return {
    count: count ? Number(count) : 0,
    isLoading,
  };
}

// Hook to get donators for a campaign
export function useGetDonators(campaignId: number) {
  const { data, isLoading } = useReadContract({
    contract,
    method: "function getDonators(uint256) view returns (address[], uint256[])",
    params: [BigInt(campaignId)],
  });

  return {
    donators: data?.[0] || [],
    donations: data?.[1] || [],
    isLoading,
  };
}

// Function to create a campaign
export async function createCampaign(
  account: any,
  title: string,
  description: string,
  target: string,
  deadline: string,
  image: string = ""
) {
  try {
    const targetInWei = parseEther(target);
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

    const transaction = prepareContractCall({
      contract,
      method: "function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)",
      params: [
        account.address,
        title,
        description,
        targetInWei,
        BigInt(deadlineTimestamp),
        image,
      ],
    });

    const result = await sendTransaction({
      transaction,
      account,
    });

    return result;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
}

// Function to donate to a campaign
export async function donateToCampaign(
  account: any,
  campaignId: number,
  amount: string
) {
  try {
    const amountInWei = parseEther(amount);

    const transaction = prepareContractCall({
      contract,
      method: "function donateToCampaign(uint256 _id) payable",
      params: [BigInt(campaignId)],
      value: amountInWei,
    });

    const result = await sendTransaction({
      transaction,
      account,
    });

    return result;
  } catch (error) {
    console.error("Error donating to campaign:", error);
    throw error;
  }
}

// Utility functions
export function formatCampaignData(campaign: any): Campaign {
  return {
    owner: campaign.owner,
    title: campaign.title,
    description: campaign.description,
    target: formatEther(campaign.target),
    deadline: new Date(Number(campaign.deadline) * 1000).toISOString().split('T')[0],
    amountCollected: formatEther(campaign.amountCollected),
    image: campaign.image,
    donators: campaign.donators,
    donations: campaign.donations.map((d: any) => formatEther(d)),
  };
}

export function getRemainingDays(deadline: string): number {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const timeDiff = deadlineDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export function getProgressPercentage(collected: string, target: string): number {
  const collectedNum = parseFloat(collected);
  const targetNum = parseFloat(target);
  if (targetNum === 0) return 0;
  return Math.min((collectedNum / targetNum) * 100, 100);
}