import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Plus, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Rocket,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  link: string;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  {
    name: 'dashboard',
    icon: <Home className="w-5 h-5" />,
    link: '/',
  },
  {
    name: 'campaign',
    icon: <Plus className="w-5 h-5" />,
    link: '/create-campaign',
  },
  {
    name: 'profile',
    icon: <User className="w-5 h-5" />,
    link: '/profile',
  },
  {
    name: 'logout',
    icon: <LogOut className="w-5 h-5" />,
    link: '/logout',
    disabled: true,
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const [isActive, setIsActive] = useState(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.link === currentPath);
    return activeItem ? activeItem.name : 'dashboard';
  });

  return (
    <div className="flex flex-col sticky top-5 h-[93vh] w-20">
      {/* Logo */}
      <Link to="/" className="mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center hover:scale-105 transition-transform group">
          <Rocket className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex-1 flex flex-col bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700/50 py-6">
        <div className="flex flex-col items-center gap-3 px-3">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={isActive === item.name ? "default" : "ghost"}
              size="icon"
              disabled={item.disabled}
              className={cn(
                "w-12 h-12 rounded-xl transition-all duration-200",
                isActive === item.name 
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg" 
                  : "hover:bg-gray-800 text-gray-400 hover:text-white",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => {
                if (!item.disabled) {
                  setIsActive(item.name);
                  navigate(item.link);
                }
              }}
              title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            >
              {item.icon}
            </Button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="mt-auto px-3">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Stats Badge */}
      <div className="mt-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl p-3 border border-green-500/30">
        <div className="flex items-center justify-center gap-1">
          <TrendingUp className="w-4 h-4 text-green-400" />
        </div>
        <div className="text-center mt-1">
          <p className="text-xs text-gray-400">Active</p>
          <p className="text-sm font-semibold text-white">42</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;