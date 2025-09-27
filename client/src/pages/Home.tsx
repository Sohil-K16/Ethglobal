import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import { Section, Grid, Flex } from '../components/ui/Layout';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Elements';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Clock, 
  Rocket, 
  Sparkles, 
  ArrowRight,
  PlusCircle,
  BarChart3,
  Shield
} from 'lucide-react';

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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { address, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const data = getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [address]);

  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Total Raised",
      value: "1,234.5 ETH",
      change: "+12.3%",
      color: "text-green-400"
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Active Campaigns",
      value: campaigns.length.toString(),
      change: "+5 this week",
      color: "text-blue-400"
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: "Success Rate",
      value: "89.2%",
      change: "+2.1%",
      color: "text-purple-400"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Avg. Duration",
      value: "45 days",
      change: "Standard",
      color: "text-orange-400"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Secure & Transparent",
      description: "All transactions are recorded on the blockchain, ensuring complete transparency and security."
    },
    {
      icon: <Rocket className="w-8 h-8 text-blue-400" />,
      title: "Quick Launch",
      description: "Create and launch your campaign in minutes with our intuitive interface."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
      title: "Real-time Analytics",
      description: "Track your campaign performance with detailed analytics and insights."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <Section variant="primary" spacing="xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="gradient" size="lg" className="mx-auto">
              <Sparkles className="w-4 h-4 mr-2" />
              Decentralized Crowdfunding Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
              Fund the{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Launch your ideas on the blockchain. Connect with supporters worldwide. 
              Build the next generation of innovative projects.
            </p>
          </div>

          <Flex justify="center" gap="lg" className="flex-col sm:flex-row">
            <Button
              size="xl"
              onClick={() => navigate('/create-campaign')}
              className="group"
            >
              <PlusCircle className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Start Your Campaign
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              onClick={() => document.getElementById('campaigns')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Campaigns
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Flex>
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <Grid cols={4} gap="lg">
          {stats.map((stat) => (
            <Card key={stat.label} variant="elevated" className="group hover:scale-105 transition-all">
              <CardContent className="p-6">
                <Flex align="center" justify="between" className="mb-4">
                  <div className={`p-3 rounded-xl bg-gray-800/50 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <Badge variant="secondary" size="sm">
                    {stat.change}
                  </Badge>
                </Flex>
                
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Features Section */}
      <Section variant="secondary">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Built with cutting-edge Web3 technology to provide the best crowdfunding experience
          </p>
        </div>

        <Grid cols={3} gap="lg">
          {features.map((feature) => (
            <Card key={feature.title} variant="ghost" className="text-center group hover:bg-gray-800/30 transition-all">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gray-800/50 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Campaigns Section */}
      <Section id="campaigns">
        <div className="mb-8">
          <Flex align="center" justify="between" className="mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Active Campaigns</h2>
              <p className="text-gray-400">Discover and support innovative projects</p>
            </div>
            
            <Button variant="outline" onClick={() => navigate('/create-campaign')}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </Flex>
        </div>

        <DisplayCampaigns 
          title=""
          isLoading={isLoading}
          campaigns={campaigns}
        />
      </Section>
    </div>
  );
};

export default Home;