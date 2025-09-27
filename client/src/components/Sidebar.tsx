import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { navlinks } from '../constants';

interface IconProps {
  styles?: string;
  name: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <button
    type="button"
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive === name ? 'bg-[#2c2f32]' : ''} flex justify-center items-center ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'} ${styles} hover:bg-[#2c2f32] transition-all`}
    onClick={handleClick}
    disabled={disabled}
    aria-pressed={isActive === name}
    tabIndex={disabled ? -1 : 0}
  >
    <span className={`text-2xl ${isActive !== name ? 'grayscale' : ''}`}>
      {imgUrl}
    </span>
  </button>
);

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(() => {
    const currentPath = location.pathname;
    const activeLink = navlinks.find(link => link.link === currentPath);
    return activeLink ? activeLink.name : 'dashboard';
  });

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <div className="w-[52px] h-[52px] bg-[#2c2f32] rounded-[10px] flex justify-center items-center">
          <span className="text-2xl">🚀</span>
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              name={link.name}
              imgUrl={link.imgUrl}
              isActive={isActive}
              disabled={link.disabled}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon 
          name="theme"
          imgUrl="☀️" 
          styles="bg-[#1c1c24] shadow-secondary" 
          handleClick={() => {/* Theme toggle functionality */}}
        />
      </div>
    </div>
  );
};

export default Sidebar;