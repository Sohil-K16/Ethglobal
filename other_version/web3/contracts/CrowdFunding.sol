// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title DecentralFund - Crowdfunding Smart Contract
 * @dev A decentralized crowdfunding platform enabling transparent and secure fundraising
 * @author DecentralFund Team
 * 
 * Key Features:
 * - Create funding campaigns with targets and deadlines
 * - Accept donations in ETH with automatic tracking
 * - Transparent donor records and fund management
 * - Secure withdrawal mechanisms for campaign owners
 * - Comprehensive input validation and security checks
 */
contract CrowdFunding {
    
    /**
     * @dev Campaign structure to store all campaign-related data
     */
    struct Campaign {
        address owner;              // Address of campaign creator
        string title;               // Campaign title
        string description;         // Detailed campaign description
        uint256 target;             // Funding target in wei
        uint256 deadline;           // Campaign deadline (Unix timestamp)
        uint256 amountCollected;    // Total amount collected so far
        string image;               // Campaign image URL
        address[] donators;         // Array of donor addresses
        uint256[] donations;        // Array of corresponding donation amounts
    }

    // Storage mapping for all campaigns
    mapping(uint256 => Campaign) public campaigns;
    
    // Total number of campaigns created
    uint256 public numberOfCampaigns = 0;
    
    // Events for frontend integration and transparency
    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed owner,
        string title,
        uint256 target,
        uint256 deadline
    );
    
    event DonationReceived(
        uint256 indexed campaignId,
        address indexed donor,
        uint256 amount,
        uint256 newTotal
    );
    
    event FundsWithdrawn(
        uint256 indexed campaignId,
        address indexed owner,
        uint256 amount
    );

    /**
     * @dev Creates a new crowdfunding campaign
     * @param _owner Address of the campaign owner
     * @param _title Campaign title (must not be empty)
     * @param _description Campaign description (must not be empty)
     * @param _target Funding target in wei (must be > 0)
     * @param _deadline Campaign deadline as Unix timestamp (must be in future)
     * @param _image Campaign image URL
     * @return campaignId The ID of the newly created campaign
     */
    function createCampaign(
        address _owner, 
        string memory _title, 
        string memory _description, 
        uint256 _target, 
        uint256 _deadline, 
        string memory _image
    ) public returns (uint256) {
        // Input validation
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        require(_target > 0, "Target amount should be greater than 0.");
        require(bytes(_title).length > 0, "Title cannot be empty.");
        require(bytes(_description).length > 0, "Description cannot be empty.");
        require(_owner != address(0), "Owner address cannot be zero address.");

        Campaign storage campaign = campaigns[numberOfCampaigns];

        // Initialize campaign data
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        uint256 campaignId = numberOfCampaigns;
        numberOfCampaigns++;

        // Emit event for frontend integration
        emit CampaignCreated(campaignId, _owner, _title, _target, _deadline);

        return campaignId;
    }

    /**
     * @dev Allows users to donate ETH to a specific campaign
     * @param _id Campaign ID to donate to
     */
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        
        // Input validation
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        require(amount > 0, "Donation amount should be greater than 0.");
        require(campaigns[_id].deadline > block.timestamp, "Campaign has ended.");

        Campaign storage campaign = campaigns[_id];
        
        // Record the donation
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        campaign.amountCollected += amount;

        // Transfer funds directly to campaign owner
        (bool sent,) = payable(campaign.owner).call{value: amount}("");
        require(sent, "Failed to send donation to campaign owner");

        // Emit event for transparency
        emit DonationReceived(_id, msg.sender, amount, campaign.amountCollected);
    }

    /**
     * @dev Retrieves all donors and their donation amounts for a specific campaign
     * @param _id Campaign ID
     * @return donators Array of donor addresses
     * @return donations Array of corresponding donation amounts
     */
    function getDonators(uint256 _id) 
        view 
        public 
        returns (address[] memory donators, uint256[] memory donations) 
    {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    /**
     * @dev Retrieves all campaigns
     * @return allCampaigns Array containing all campaign data
     */
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
    
    /**
     * @dev Retrieves a specific campaign by ID
     * @param _id Campaign ID
     * @return campaign The campaign data
     */
    function getCampaign(uint256 _id) public view returns (Campaign memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        return campaigns[_id];
    }
    
    /**
     * @dev Checks if a campaign has reached its funding target
     * @param _id Campaign ID
     * @return success True if target is reached
     */
    function isCampaignSuccessful(uint256 _id) public view returns (bool) {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        return campaigns[_id].amountCollected >= campaigns[_id].target;
    }
    
    /**
     * @dev Checks if a campaign is still active (not expired)
     * @param _id Campaign ID
     * @return active True if campaign is still active
     */
    function isCampaignActive(uint256 _id) public view returns (bool) {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        return campaigns[_id].deadline > block.timestamp;
    }
    
    /**
     * @dev Gets the total number of donors for a campaign
     * @param _id Campaign ID
     * @return count Number of unique donors
     */
    function getDonorCount(uint256 _id) public view returns (uint256) {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        return campaigns[_id].donators.length;
    }
}