import React from 'react';
import { formatEther, daysLeft, calculateBarPercentage } from '../utils/helpers';

interface FundCardProps {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountCollected: string;
  image: string;
  handleClick: () => void;
}

const FundCard: React.FC<FundCardProps> = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  const percentage = calculateBarPercentage(formatEther(target), formatEther(amountCollected));

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      <img 
        src={image || 'https://via.placeholder.com/288x158?text=Campaign+Image'} 
        alt="fund" 
        className="w-full h-[158px] object-cover rounded-[15px]"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/288x158?text=No+Image';
        }}
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <span className="text-2xl mr-2">📁</span>
          <p className="font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {formatEther(amountCollected)}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {formatEther(target)}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <span className="text-[#1dc071] font-semibold text-sm">
              {owner?.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-[#13131a] rounded-full h-2">
            <div 
              className="bg-[#1dc071] h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-[#808191]">{percentage}% funded</p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;