import React from 'react';
import { Calendar, Target, TrendingUp, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
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
    <Card 
      variant="elevated" 
      interactive 
      className="w-full max-w-sm group overflow-hidden"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={image || 'https://via.placeholder.com/288x158?text=Campaign+Image'}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/288x158?text=No+Image';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-600/90 text-white backdrop-blur-sm">
            <Target className="w-3 h-3 mr-1" />
            Campaign
          </span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-purple-300 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2 text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-purple-400 font-semibold">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400">Raised</span>
            </div>
            <p className="font-semibold text-white text-sm">{formatEther(amountCollected)} ETH</p>
            <p className="text-xs text-gray-500">of {formatEther(target)} ETH</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-400">Days Left</span>
            </div>
            <p className="font-semibold text-white text-sm">{remainingDays}</p>
            <p className="text-xs text-gray-500">
              {remainingDays === 0 ? 'Expired' : remainingDays === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-700/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Created by</p>
            <p className="text-sm font-medium text-white truncate">{owner}</p>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="default" 
          size="sm" 
          className="w-full mt-4"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default FundCard;
