import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Search, PlusCircle, Filter, TrendingUp } from 'lucide-react';
import FundCard from './FundCard';
import { Grid } from './ui/Layout';
import { Skeleton } from './ui/Elements';
import { Button } from './ui/Button';

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

  const renderLoadingSkeleton = () => (
    <Grid cols="auto" gap="lg">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={`skeleton-${i}`} className="bg-gray-800/50 rounded-xl p-6 space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </Grid>
  );

  const renderEmptyState = () => (
    <div className="text-center py-20">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No Campaigns Found</h3>
          <p className="text-gray-400 leading-relaxed mb-8">
            Be the pioneer! Launch the first campaign and inspire others to follow your lead.
          </p>
        </div>
        
        <Button
          variant="default"
          size="lg"
          onClick={() => navigate('/create-campaign')}
          className="group"
        >
          <PlusCircle className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Create First Campaign
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-8">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 font-medium text-sm">
                {campaigns.length} {campaigns.length === 1 ? 'campaign' : 'campaigns'}
              </span>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="default" size="sm" onClick={() => navigate('/create-campaign')}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      {isLoading && renderLoadingSkeleton()}
      
      {!isLoading && campaigns.length === 0 && renderEmptyState()}

      {!isLoading && campaigns.length > 0 && (
        <Grid cols="auto" gap="lg">
          {campaigns.map((campaign) => (
            <FundCard 
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default DisplayCampaigns;