#!/bin/bash

echo "========================================"
echo "   DecentralFund - Hackathon Setup"
echo "========================================"
echo

echo "[1/5] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js is installed ($(node --version))"

echo
echo "[2/5] Installing frontend dependencies..."
cd client
if ! npm install; then
    echo "❌ ERROR: Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"

echo
echo "[3/5] Installing smart contract dependencies..."
cd ../web3
if ! npm install; then
    echo "❌ ERROR: Failed to install web3 dependencies"
    exit 1
fi
echo "✅ Smart contract dependencies installed"

echo
echo "[4/5] Creating environment file template..."
if [ ! -f .env ]; then
    cat > .env << EOF
PRIVATE_KEY=your_wallet_private_key_here
THIRDWEB_API_KEY=your_thirdweb_api_key_here
EOF
    echo "✅ .env file created - Please update it with your credentials"
else
    echo "✅ .env file already exists"
fi

echo
echo "[5/5] Setup complete!"
echo
echo "========================================"
echo "           NEXT STEPS:"
echo "========================================"
echo "1. Update web3/.env with your credentials"
echo "2. Deploy smart contract: cd web3 && npm run deploy"
echo "3. Start the app: cd client && npm run dev"
echo
echo "Happy hacking! 🚀"
echo "========================================"

cd ..