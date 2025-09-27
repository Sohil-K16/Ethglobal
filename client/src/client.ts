import { createThirdwebClient } from "thirdweb";

// Get client ID from environment variables
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

console.log("🔑 Client configuration:", {
  clientId: clientId ? "Present" : "Missing",
  env: import.meta.env.MODE
});

if (!clientId) {
  console.warn("⚠️ No thirdweb client ID provided. Get one at https://thirdweb.com/dashboard");
  // Use a fallback client ID for development
}

export const client = createThirdwebClient({
  clientId: clientId || "2eba39296fe460083c8cc4d0c005a719", // Fallback to actual client ID
});
