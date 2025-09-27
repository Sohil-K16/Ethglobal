import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { formatEther, daysLeft, calculateBarPercentage } from '../utils/helpers';

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

interface Donator {
  donator: string;
  donation: string;
}

const CampaignDetails: React.FC = () => {
  const { state }: { state: Campaign } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState<Donator[]>([]);

  const remainingDays = daysLeft(state.deadline);
  const percentage = calculateBarPercentage(formatEther(state.target), formatEther(state.amountCollected));

  const fetchDonators = async () => {
    const data = getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (state) fetchDonators();
  }, [state]);

  const handleDonate = async () => {
    if (!amount) return;
    
    setIsLoading(true);
    try {
      const result = await donate(state.pId, amount);
      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error donating:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!state) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-white text-xl">Campaign not found</p>
      </div>
    );
  }

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1dc071]"></div>
          <p className="mt-4 font-epilogue font-bold text-[20px] text-white text-center">
            Processing Donation...
          </p>
        </div>
      )}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img 
            src={state.image || 'https://via.placeholder.com/800x400?text=Campaign+Image'} 
            alt="campaign" 
            className="w-full h-[410px] object-cover rounded-xl"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/800x400?text=No+Image';
            }}
          />
          
          {/* Progress bar */}
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div 
              className="absolute h-full bg-[#4acd8d] transition-all duration-300"
              style={{ width: `${percentage}%`, maxWidth: '100%' }}
            />
          </div>
        </div>

        <div className="w-full md:w-[458px] flex flex-col gap-[30px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <span className="text-[#1dc071] font-semibold text-lg">
                  {state.owner?.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  Campaign Creator
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                    {index + 1}. {item.donator}
                  </p>
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px]">
                    {formatEther(item.donation)}
                  </p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-2 flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>
            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
              <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
                Fund the campaign
              </p>
              <div className="mt-[30px]">
                <input 
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                    Back it because you believe in it.
                  </h4>
                  <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                    Support the project for no reward, just because it speaks to you.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDonate}
                  disabled={isLoading || !amount}
                  className="w-full bg-[#8c6dfd] hover:bg-[#7c5df5] font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Processing...' : 'Fund Campaign'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mt-[20px] flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="font-epilogue font-normal text-[16px] text-[#808191]">Raised of</span>
              <span className="font-epilogue font-semibold text-[16px] text-white">
                {formatEther(state.amountCollected)} ETH
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-epilogue font-normal text-[16px] text-[#808191]">Target</span>
              <span className="font-epilogue font-semibold text-[16px] text-white">
                {formatEther(state.target)} ETH
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-epilogue font-normal text-[16px] text-[#808191]">Days left</span>
              <span className="font-epilogue font-semibold text-[16px] text-white">
                {remainingDays}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-epilogue font-normal text-[16px] text-[#808191]">Progress</span>
              <span className="font-epilogue font-semibold text-[16px] text-white">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;