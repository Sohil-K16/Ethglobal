import { createThirdwebClient, defineChain } from "thirdweb";

// Your thirdweb client ID (you can get one for free at https://thirdweb.com/dashboard)
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your_client_id_here";

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
  rpc: `https://sepolia.infura.io/v3/${process.env.VITE_INFURA_API_KEY}`,
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