import React, { createContext, useContext, ReactNode } from 'react';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { prepareContractCall, sendTransaction } from 'thirdweb';
import { contract } from '../hooks/useCrowdfunding';

// Utility function for Wei conversion
function parseEther(value: string): bigint {
  return BigInt(Math.floor(parseFloat(value) * 1e18));
}

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountCollected: string;
  image: string;
  donators: string[];
  donations: string[];
  pId: number;
}

interface CampaignForm {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

interface StateContextType {
  address: string | undefined;
  contract: any;
  createCampaign: (form: CampaignForm) => Promise<{ success: boolean; data?: any; error?: any }>;
  getCampaigns: () => Campaign[];
  getUserCampaigns: () => Campaign[];
  donate: (pId: number, amount: string) => Promise<{ success: boolean; data?: any; error?: any }>;
  getDonations: (pId: number) => { donator: string; donation: string }[];
  isLoading: boolean;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateContextProvider');
  }
  return context;
};

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  // Get all campaigns using the existing hook
  const { data: campaignsData, isLoading } = useReadContract({
    contract,
    method: "function getCampaigns() view returns ((address,string,string,uint256,uint256,uint256,string,address[],uint256[])[])",
    params: [],
  });

  const parsedCampaigns: Campaign[] = React.useMemo(() => {
    if (!campaignsData) return [];
    
    return campaignsData.map((campaign: any, i: number) => ({
      owner: campaign[0],
      title: campaign[1],
      description: campaign[2],
      target: campaign[3].toString(),
      deadline: campaign[4].toString(),
      amountCollected: campaign[5].toString(),
      image: campaign[6],
      donators: campaign[7],
      donations: campaign[8].map((donation: bigint) => donation.toString()),
      pId: i,
    }));
  }, [campaignsData]);

  const createCampaign = async (form: CampaignForm) => {
    try {
      if (!activeAccount) {
        throw new Error('No active account');
      }

      const transaction = prepareContractCall({
        contract,
        method: "function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)",
        params: [
          activeAccount.address,
          form.title,
          form.description,
          parseEther(form.target),
          BigInt(new Date(form.deadline).getTime()),
          form.image,
        ],
      });

      const result = await sendTransaction({
        transaction,
        account: activeAccount,
      });

      console.log("Campaign created successfully", result);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error creating campaign:", error);
      return { success: false, error };
    }
  };

  const getCampaigns = () => {
    return parsedCampaigns;
  };

  const getUserCampaigns = () => {
    return parsedCampaigns.filter((campaign) => campaign.owner === address);
  };

  const donate = async (pId: number, amount: string) => {
    try {
      if (!activeAccount) {
        throw new Error('No active account');
      }

      const transaction = prepareContractCall({
        contract,
        method: "function donateToCampaign(uint256 _id) payable",
        params: [BigInt(pId)],
        value: parseEther(amount),
      });

      const result = await sendTransaction({
        transaction,
        account: activeAccount,
      });

      console.log("Donation successful", result);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error donating:", error);
      return { success: false, error };
    }
  };

  const getDonations = (pId: number) => {
    const campaign = parsedCampaigns[pId];
    if (!campaign) return [];

    const donations = campaign.donators.map((donator, i) => ({
      donator,
      donation: campaign.donations[i],
    }));

    return donations;
  };

  const value: StateContextType = React.useMemo(() => ({
    address,
    contract,
    createCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    getDonations,
    isLoading,
  }), [address, contract, parsedCampaigns, isLoading]);

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
};