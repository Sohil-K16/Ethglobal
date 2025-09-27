import { createThirdwebClient } from "thirdweb";

// Get client ID from environment variables
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "your_client_id_here";

if (clientId === "your_client_id_here") {
  console.warn("⚠️ No thirdweb client ID provided. Get one at https://thirdweb.com/dashboard");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
