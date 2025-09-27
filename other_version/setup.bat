@echo off
echo.
echo ========================================
echo   DecentralFund - Hackathon Setup
echo ========================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed

echo.
echo [2/5] Installing frontend dependencies...
cd client
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

echo.
echo [3/5] Installing smart contract dependencies...
cd ..\web3
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install web3 dependencies
    pause
    exit /b 1
)
echo ✓ Smart contract dependencies installed

echo.
echo [4/5] Creating environment file template...
if not exist .env (
    echo PRIVATE_KEY=your_wallet_private_key_here > .env
    echo THIRDWEB_API_KEY=your_thirdweb_api_key_here >> .env
    echo ✓ .env file created - Please update it with your credentials
) else (
    echo ✓ .env file already exists
)

echo.
echo [5/5] Setup complete!
echo.
echo ========================================
echo           NEXT STEPS:
echo ========================================
echo 1. Update web3\.env with your credentials
echo 2. Deploy smart contract: cd web3 ^&^& npm run deploy
echo 3. Start the app: cd client ^&^& npm run dev
echo.
echo Happy hacking! 🚀
echo ========================================

cd ..
pause