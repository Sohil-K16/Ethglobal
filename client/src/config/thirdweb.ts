import { createThirdwebClient, defineChain } from "thirdweb";

// Your thirdweb client ID (you can get one for free at https://thirdweb.com/dashboard)
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "2eba39296fe460083c8cc4d0c005a719";

console.log("🔧 thirdweb config loading:", { clientId: clientId ? "✅" : "❌" });

export const client = createThirdwebClient({
  clientId,
});

// Sepolia testnet configuration
export const sepolia = defineChain({
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "SEP",
    decimals: 18,
  },
  rpc: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY || "c9a66d36cd524232b14a6889cde5c4c8"}`,
  blockExplorers: [
    {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api",
    },
  ],
  testnet: true,
});

// Your deployed contract address
export const CROWDFUNDING_CONTRACT_ADDRESS = "0xF4F21769b98c3D8192D699675F31a4d6e8979bC6";