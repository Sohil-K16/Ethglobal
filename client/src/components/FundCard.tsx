import React from 'react';
import { Target, User, ArrowUpRight, Clock, DollarSign } from 'lucide-react';
import { Card, CardDescription, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Badge, Progress } from './ui/Elements';
import { Flex } from './ui/Layout';
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
  const raisedAmount = parseFloat(formatEther(amountCollected));
  const targetAmount = parseFloat(formatEther(target));
  
  const isExpired = remainingDays <= 0;
  const isAlmostExpired = remainingDays <= 7 && remainingDays > 0;
  const isSuccessful = percentage >= 100;

  const getStatusBadge = () => {
    if (isSuccessful) {
      return <Badge variant="success" size="sm">Funded</Badge>;
    }
    if (isExpired) {
      return <Badge variant="destructive" size="sm">Expired</Badge>;
    }
    if (isAlmostExpired) {
      return <Badge variant="warning" size="sm">Ending Soon</Badge>;
    }
    return <Badge variant="info" size="sm">Active</Badge>;
  };

  return (
    <Card 
      variant="elevated" 
      interactive 
      className="w-full group overflow-hidden border-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl hover:from-gray-800/90 hover:to-gray-700/90 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop&crop=center'}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop&crop=center';
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge variant="gradient" size="sm" className="backdrop-blur-sm">
            <Target className="w-3 h-3 mr-1" />
            Campaign
          </Badge>
          {getStatusBadge()}
        </div>

        {/* Progress Overlay */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3">
            <Flex justify="between" align="center" className="mb-2">
              <span className="text-white text-sm font-medium">{percentage}% Funded</span>
              <span className="text-gray-300 text-xs">{remainingDays} days left</span>
            </Flex>
            <Progress value={percentage} variant="gradient" size="sm" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <CardTitle className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {description}
          </CardDescription>
        </div>

        {/* Progress Section */}
        <div className="mb-6 space-y-3">
          <Flex justify="between" align="center">
            <span className="text-gray-400 text-sm">Progress</span>
            <span className="text-purple-400 font-semibold text-sm">{percentage}%</span>
          </Flex>
          <Progress value={percentage} variant="gradient" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
            <Flex align="center" gap="sm" className="mb-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400 font-medium">Raised</span>
            </Flex>
            <p className="font-bold text-white text-lg">{raisedAmount.toFixed(3)}</p>
            <p className="text-xs text-gray-500">of {targetAmount.toFixed(3)} ETH</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
            <Flex align="center" gap="sm" className="mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-400 font-medium">Time Left</span>
            </Flex>
            <p className="font-bold text-white text-lg">{remainingDays}</p>
            <p className="text-xs text-gray-500">
              {(() => {
                if (remainingDays === 0) return 'Expired';
                if (remainingDays === 1) return 'day';
                return 'days';
              })()}
            </p>
          </div>
        </div>

        {/* Creator Info */}
        <div className="mb-6 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
          <Flex align="center" gap="sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-1">Campaign Creator</p>
              <p className="text-sm font-medium text-white truncate">
                {owner.slice(0, 6)}...{owner.slice(-4)}
              </p>
            </div>
          </Flex>
        </div>

        {/* Action Button */}
        <Button 
          variant="default" 
          size="default"
          className="w-full group/btn hover:scale-[1.02] transition-all"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <span>View Campaign</span>
          <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Button>
      </div>
    </Card>
  );
};

export default FundCard;
