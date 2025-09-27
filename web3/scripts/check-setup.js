const { ethers } = require("hardhat");
require("dotenv").config();

async function checkSetup() {
  console.log("🔍 Checking Sepolia setup...\n");

  // Check if private key is set
  if (!process.env.PRIVATE_KEY) {
    console.log("❌ PRIVATE_KEY not found in .env");
    return;
  }
  console.log("✅ Private key found");

  // Check wallet address
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  console.log("📱 Wallet Address:", wallet.address);

  // Check if Infura API key is set
  if (!process.env.INFURA_API_KEY || process.env.INFURA_API_KEY === "your_infura_api_key_here") {
    console.log("⚠️  INFURA_API_KEY not set - you'll need this to deploy");
    console.log("   Get one from: https://infura.io/");
  } else {
    console.log("✅ Infura API key found");
    
    // Try to connect to Sepolia
    try {
      const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
      const balance = await provider.getBalance(wallet.address);
      console.log("💰 Sepolia ETH Balance:", ethers.formatEther(balance), "ETH");
      
      if (balance === 0n) {
        console.log("⚠️  No Sepolia ETH found. Get some from:");
        console.log("   • https://sepoliafaucet.com/");
        console.log("   • https://sepolia-faucet.pk910.de/");
      }
    } catch (error) {
      console.log("❌ Failed to connect to Sepolia:", error.message);
    }
  }

  console.log("\n🚀 Ready to deploy once you have:");
  console.log("   1. Infura API key in .env");
  console.log("   2. Some Sepolia ETH in your wallet");
}

checkSetup();