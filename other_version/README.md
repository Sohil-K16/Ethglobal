# 🚀 DecentralFund - Web3 Crowdfunding Platform

![Crowdfunding Platform](https://i.ibb.co/k6pj0Qt/htum-6.png)

## � Hackathon Submission

**DecentralFund** is a decentralized crowdfunding platform built on blockchain technology, enabling transparent, secure, and trustless fundraising campaigns. This project demonstrates the power of Web3 technology in creating fair and accessible funding solutions.

## ✨ Key Features

- 🔐 **Wallet Integration**: Connect with MetaMask and other Web3 wallets
- � **Campaign Creation**: Create detailed funding campaigns with goals and deadlines
- 💰 **Secure Donations**: Make donations using cryptocurrency (ETH)
- 📊 **Real-time Tracking**: Monitor campaign progress and funding status
- 👥 **Donor Transparency**: View all contributors and their donation amounts
- 🎯 **Smart Contract Security**: Automated fund management and withdrawal
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Blockchain
- **Solidity** - Smart contract development
- **Hardhat** - Ethereum development environment
- **thirdweb** - Web3 development platform
- **Ethers.js** - Ethereum library for blockchain interaction

### Infrastructure
- **IPFS** - Decentralized file storage
- **MetaMask** - Wallet integration

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask wallet extension
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project_crowdfunding-master
```

### 2. Install Dependencies

**Frontend Setup:**
```bash
cd client
npm install
```

**Smart Contract Setup:**
```bash
cd ../web3
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `web3` directory:
```env
PRIVATE_KEY=your_wallet_private_key
THIRDWEB_API_KEY=your_thirdweb_api_key
```

### 4. Deploy Smart Contract
```bash
cd web3
npm run deploy
```

### 5. Start the Application
```bash
cd ../client
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Usage Instructions

### For Campaign Creators:
1. **Connect Wallet**: Click "Connect" and link your MetaMask wallet
2. **Create Campaign**: Navigate to "Create Campaign" and fill in:
   - Campaign title and description
   - Funding target (in ETH)
   - Campaign deadline
   - Campaign image URL
3. **Publish**: Submit the form to deploy your campaign on the blockchain
4. **Share**: Share your campaign link with potential donors

### For Donors:
1. **Browse Campaigns**: View all active campaigns on the home page
2. **Campaign Details**: Click on any campaign to view full details
3. **Make Donation**: Enter donation amount and confirm transaction
4. **Track Progress**: Monitor campaign progress and your contributions

## 🔧 Project Structure

```
project_crowdfunding-master/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── context/       # React context providers
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── index.html
│   └── package.json
├── web3/                  # Smart contract and blockchain logic
│   ├── contracts/
│   │   └── CrowdFunding.sol
│   ├── hardhat.config.js
│   └── package.json
└── README.md
```

## 🔐 Smart Contract Features

The `CrowdFunding.sol` contract includes:

- **Campaign Creation**: Store campaign metadata on-chain
- **Donation Management**: Handle ETH donations securely
- **Deadline Enforcement**: Prevent donations after campaign ends
- **Fund Withdrawal**: Allow campaign owners to withdraw funds
- **Donor Tracking**: Maintain transparent donation records

### Key Functions:
- `createCampaign()` - Create a new funding campaign
- `donateToCampaign()` - Make a donation to a campaign
- `withdrawFunds()` - Withdraw collected funds (campaign owner only)
- `getDonators()` - Get list of campaign donors
- `getCampaigns()` - Retrieve all campaigns

## 🌐 Deployment

### Frontend Deployment (IPFS)
```bash
cd client
npm run deploy
```

### Smart Contract Deployment
The contract can be deployed to various networks:
- **Testnet**: Goerli, Mumbai (for testing)
- **Mainnet**: Ethereum, Polygon (for production)

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm run dev  # Start development server
npm run build  # Build for production
```

### Smart Contract Testing
```bash
cd web3
npx hardhat test  # Run contract tests
npx hardhat compile  # Compile contracts
```

## 📊 Demo & Screenshots

### Home Page - Browse Campaigns
- View all active funding campaigns
- Filter by category or search
- See funding progress and time remaining

### Create Campaign
- Intuitive form for campaign creation
- Real-time validation
- Blockchain transaction confirmation

### Campaign Details
- Detailed campaign information
- Donation interface
- Progress tracking
- Donor list

## 🔒 Security Features

- **Smart Contract Auditing**: Comprehensive input validation
- **Deadline Enforcement**: Time-based access control
- **Fund Safety**: Secure withdrawal mechanisms
- **Transparent Operations**: All transactions visible on blockchain

## 🌟 Future Enhancements

- [ ] Multi-token support (USDC, DAI, etc.)
- [ ] Campaign categories and filtering
- [ ] Social media sharing integration
- [ ] Email notifications for campaign updates
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] NFT rewards for donors
- [ ] Milestone-based funding
- [ ] Campaign verification system

## 🤝 Contributing

This project is open for contributions! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Role**: Full-stack Web3 Developer
- **Focus**: Blockchain integration, Smart contract development, Frontend design

## 📞 Contact & Support

- **Email**: [your-email@example.com]
- **GitHub**: [your-github-profile]
- **Demo**: [deployed-app-url]
- **Video Demo**: [demo-video-url]

## 🏅 Hackathon Highlights

### Innovation
- Combines traditional crowdfunding with blockchain transparency
- Eliminates intermediaries and reduces fees
- Global accessibility without geographical restrictions

### Technical Achievement
- Full-stack Web3 application
- Smart contract integration
- Modern React frontend with responsive design
- IPFS deployment for decentralization

### Impact
- Democratizes access to funding
- Provides transparency in fund management
- Enables global participation in fundraising
- Reduces barriers for entrepreneurs and creators

---

**Built with ❤️ for the blockchain community**
