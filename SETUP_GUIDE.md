# 🔑 Getting Your thirdweb Client ID

## Quick Setup Guide

1. **Visit thirdweb Dashboard**
   - Go to: https://thirdweb.com/dashboard
   - Sign in with your GitHub/Google account (free)

2. **Create API Key**
   - Click "Settings" in the sidebar
   - Click "API Keys" 
   - Click "Create API Key"
   - Copy your Client ID

3. **Update Environment Variables**
   ```bash
   # In client/.env file, replace:
   VITE_THIRDWEB_CLIENT_ID=your_actual_client_id_here
   ```

4. **Restart Dev Server**
   ```bash
   cd client
   npm run dev
   ```

## 🚀 Your DApp is Ready!

Once you add the client ID, you can:
- ✅ Create crowdfunding campaigns on Sepolia
- ✅ Donate ETH to campaigns
- ✅ View real-time campaign progress
- ✅ Connect with MetaMask wallet

## 📱 Testing Your DApp

1. **Connect MetaMask to Sepolia**
   - Network: Sepolia Testnet
   - RPC URL: Already configured in the app

2. **Get Test ETH**
   - Use faucets like: https://sepoliafaucet.com/
   - Your wallet: `0x0d851c7a0B4A8dCffb78C8b989d4501A33D2278B`

3. **Create Your First Campaign**
   - Fill out the campaign form
   - Set target amount and deadline
   - Submit transaction in MetaMask

4. **Test Donations**
   - View created campaigns
   - Donate small amounts (0.01 ETH)
   - Watch progress bars update

## 🎯 Current Status

✅ **Smart Contract**: Deployed and verified on Sepolia  
✅ **Frontend**: Complete with React + thirdweb  
✅ **Integration**: Full blockchain interaction ready  
⚠️ **Missing**: thirdweb client ID for full functionality  

**Contract Address**: `0xF4F21769b98c3D8192D699675F31a4d6e8979bC6`  
**GitHub**: https://github.com/Sohil-K16/Ethglobal  
**Local**: http://localhost:5173/