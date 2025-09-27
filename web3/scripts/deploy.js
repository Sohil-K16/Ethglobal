const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying CrowdFunding contract to Sepolia...");

  // Get the contract factory
  const CrowdFunding = await ethers.getContractFactory("CrowdFunding");

  // Deploy the contract
  const crowdFunding = await CrowdFunding.deploy();

  // Wait for deployment to be mined
  await crowdFunding.waitForDeployment();

  const contractAddress = await crowdFunding.getAddress();
  
  console.log("CrowdFunding contract deployed to:", contractAddress);
  console.log("Transaction hash:", crowdFunding.deploymentTransaction().hash);
  
  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await crowdFunding.deploymentTransaction().wait(5);
  
  console.log("Contract verified and ready!");
  console.log("View on Sepolia Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });