import React from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input 
          type="text" 
          placeholder="Search for campaigns" 
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        
        <button className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center hover:bg-[#3fb374] transition-colors">
          <span className="text-white text-xl">🔍</span>
        </button>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <button 
          className="bg-[#1dc071] hover:bg-[#1aa160] px-4 py-2 rounded-[10px] text-white font-semibold transition-colors"
          onClick={() => navigate('/create-campaign')}
        >
          Create Campaign
        </button>

        {account && (
          <button 
            className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center hover:bg-[#3c3f42] transition-colors"
            onClick={() => navigate('/profile')}
          >
            <span className="text-[#1dc071] font-semibold text-lg">
              {account.address?.slice(0, 2).toUpperCase()}
            </span>
          </button>
        )}
      </div>

      {/* Small screen menu */}
      <div className="sm:hidden flex justify-between items-center relative">
        <button 
          className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center hover:bg-[#3c3f42] transition-colors"
          onClick={() => navigate('/')}
        >
          <span className="text-2xl">🚀</span>
        </button>

        <button 
          className="bg-[#1dc071] hover:bg-[#1aa160] px-3 py-2 rounded-[10px] text-white font-semibold text-sm transition-colors"
          onClick={() => navigate('/create-campaign')}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Navbar;