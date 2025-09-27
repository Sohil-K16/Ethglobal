import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FundCard from './FundCard';

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountCollected: string;
  image: string;
  pId: number;
}

interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: Campaign[];
}

const DisplayCampaigns: React.FC<DisplayCampaignsProps> = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign: Campaign) => {
    navigate(`/campaign-details/${campaign.pId}`, { state: campaign });
  };
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <div className="flex justify-center items-center w-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1dc071]"></div>
          </div>
        )}

        {!isLoading && campaigns.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full py-20">
            <span className="text-6xl mb-4">📭</span>
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] text-center">
              No campaigns found. Be the first to create one!
            </p>
          </div>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
          <FundCard 
            key={uuidv4()}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;