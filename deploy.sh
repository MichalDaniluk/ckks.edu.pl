#!/bin/bash

set -e  # Exit on any error

# Configuration
REMOTE_USER="ckkspl"
REMOTE_SERVER="s42.mydevil.net"
REMOTE_DIR="~/domains/ckks.edu.pl/public_nodejs"
WEBSITE_URL="https://ckks.edu.pl"

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Build the application
echo "📦 Building Next.js application..."
if command -v yarn &> /dev/null; then
    yarn build
else
    npm run build
fi

# Check if build was successful
if [ ! -d ".next" ]; then
    echo "❌ Error: Build failed - .next directory not found."
    exit 1
fi

echo "📂 Copying files to production server..."

# Copy build directory
echo "  → Copying .next directory..."
rsync -avz --delete .next/ ${REMOTE_USER}@${REMOTE_SERVER}:${REMOTE_DIR}/.next/

# Copy package files for dependencies
echo "  → Copying package files..."
rsync -avz package.json ${REMOTE_USER}@${REMOTE_SERVER}:${REMOTE_DIR}/
if [ -f "yarn.lock" ]; then
    rsync -avz yarn.lock ${REMOTE_USER}@${REMOTE_SERVER}:${REMOTE_DIR}/
fi

# Copy configuration files
echo "  → Copying configuration files..."
rsync -avz next.config.cjs ${REMOTE_USER}@${REMOTE_SERVER}:${REMOTE_DIR}/

# Copy public assets (excluding gitignored directories)
echo "  → Copying public assets..."
rsync -avz --exclude='galeria/*' --exclude='img/*' --exclude='o/*' public/ ${REMOTE_USER}@${REMOTE_SERVER}:${REMOTE_DIR}/public/

# Install dependencies and restart application on server
echo "🔄 Installing dependencies and restarting application..."
ssh ${REMOTE_USER}@${REMOTE_SERVER} << EOF
    cd ${REMOTE_DIR}
    echo "Installing dependencies..."
    if command -v yarn &> /dev/null; then
        yarn install --frozen-lockfile --production
    else
        npm ci --only=production
    fi

    echo "Restarting application..."
    devil www restart ckks.edu.pl
EOF

echo "⏳ Waiting for application to start..."
sleep 10

# Verify deployment
echo "🔍 Verifying deployment..."
if curl -f -s ${WEBSITE_URL} > /dev/null; then
    echo "✅ Deployment successful! Website is responding."
    echo "🌐 Website: ${WEBSITE_URL}"
else
    echo "⚠️  Warning: Website might not be responding yet. Please check manually."
    echo "🌐 Website: ${WEBSITE_URL}"
fi

echo "🎉 Deploy completed!"
