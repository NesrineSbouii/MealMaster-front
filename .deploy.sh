#!/bin/bash

# Print out the Node.js version for debugging purposes
echo "Node.js Version: $(node -v)"

# Navigate to the deployment directory
cd "$DEPLOYMENT_TARGET"

# Set the Node.js version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm use 16.20.0

# Install dependencies
npm install

# Build your Angular application
ng build --prod

# Rename the "dist" directory to "wwwroot"
mv dist wwwroot
