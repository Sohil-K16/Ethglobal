import { createThirdwebClient } from "thirdweb";

// Get client ID from environment variables
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

if (!clientId) {
  console.warn("⚠️ No thirdweb client ID provided. Get one at https://thirdweb.com/dashboard");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
