import React, { useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, User, Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8 gap-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
              variant="filled"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </form>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="default"
            size="default"
            onClick={() => navigate('/create-campaign')}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>

          {account ? (
            <Button
              variant="outline"
              size="default"
              onClick={() => navigate('/profile')}
              className="gap-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">
                {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
              </span>
            </Button>
          ) : (
            <Button variant="secondary" size="default">
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
          <div className="flex flex-col gap-3">
            <Button
              variant="default"
              size="default"
              onClick={() => {
                navigate('/create-campaign');
                setIsMobileMenuOpen(false);
              }}
              className="gap-2 w-full"
            >
              <Plus className="w-4 h-4" />
              Create Campaign
            </Button>

            {account ? (
              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  navigate('/profile');
                  setIsMobileMenuOpen(false);
                }}
                className="gap-2 w-full"
              >
                <User className="w-4 h-4" />
                {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
              </Button>
            ) : (
              <Button variant="secondary" size="default" className="w-full">
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;