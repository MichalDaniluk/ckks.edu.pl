#!/bin/bash

set -e  # Exit on any error

# Configuration
REMOTE_USER="ckkspl"
REMOTE_SERVER="s42.mydevil.net"
FRONTEND_DIR="~/domains/ckks.edu.pl/public_nodejs"
API_DIR="~/domains/api.ckks.pl/public_nodejs"
FRONTEND_URL="https://ckks.edu.pl"
API_URL="https://api.ckks.pl"

echo "🚀 Starting CKKS Production Deployment..."
echo "📋 Deploying both Frontend (Next.js) and API (NestJS) applications"
echo ""

# Function to check if we're in the right directory
check_project_root() {
    if [ ! -f "package.json" ] || [ ! -d "api" ]; then
        echo "❌ Error: Not in project root. Make sure you're in the CKKS project directory."
        exit 1
    fi
}

# Function to deploy NestJS API
deploy_api() {
    echo "🔧 === DEPLOYING NESTJS API ==="

    cd api

    # Build the API
    echo "📦 Building NestJS API..."
    npm run build

    # Check if build was successful
    if [ ! -d "dist" ]; then
        echo "❌ Error: API build failed - dist directory not found."
        exit 1
    fi

    echo "📂 Copying API files to production server..."

    # Copy build directory
    echo "  → Copying dist directory..."
    rsync -avz --delete dist/ ${REMOTE_USER}@${REMOTE_SERVER}:${API_DIR}/dist/

    # Copy package files
    echo "  → Copying package files..."
    rsync -avz package.json ${REMOTE_USER}@${REMOTE_SERVER}:${API_DIR}/
    if [ -f "package-lock.json" ]; then
        rsync -avz package-lock.json ${REMOTE_USER}@${REMOTE_SERVER}:${API_DIR}/
    fi

    # Copy Passenger configuration files
    echo "  → Copying configuration files..."
    if [ -f "app.js" ]; then
        rsync -avz app.js ${REMOTE_USER}@${REMOTE_SERVER}:${API_DIR}/
    fi
    if [ -f "server.js" ]; then
        rsync -avz server.js ${REMOTE_USER}@${REMOTE_SERVER}:${API_DIR}/
    fi
    if [ -f ".passenger" ]; then
        rsync -avz .passenger ${REMOTE_USER}@${REMOTE_SERVER}:${API_DIR}/
    fi

    # Copy environment file for production
    if [ -f ".env.production" ]; then
        echo "  → Copying production environment..."
        rsync -avz .env.production ${REMOTE_USER}@${REMOTE_SERVER}:${API_DIR}/.env
    fi

    # Install dependencies and restart API on server
    echo "🔄 Installing API dependencies and restarting..."
    ssh ${REMOTE_USER}@${REMOTE_SERVER} << 'EOF_API'
        cd ~/domains/api.ckks.pl/public_nodejs
        echo "Installing API dependencies..."
        npm ci --only=production

        echo "Creating Passenger configuration if needed..."
        if [ ! -f ".passenger" ]; then
            cat > .passenger << 'EOF_PASSENGER'
{
  "nodejs": "20.0.0",
  "startup_file": "app.js",
  "environment": "production"
}
EOF_PASSENGER
        fi

        echo "Restarting API application..."
        devil www restart api.ckks.pl
EOF_API

    cd ..
    echo "✅ API deployment completed"
}

# Function to deploy Next.js Frontend
deploy_frontend() {
    echo "🖥️  === DEPLOYING NEXT.JS FRONTEND ==="

    # Build the frontend for static export
    echo "📦 Building Next.js application..."
    npm run build
    npm run prod  # Generate static export

    # Check if build was successful
    if [ ! -d "out" ]; then
        echo "❌ Error: Frontend build failed - out directory not found."
        exit 1
    fi

    echo "📂 Copying Frontend files to production server..."

    # Copy static export files
    echo "  → Copying static files..."
    rsync -avz --delete out/ ${REMOTE_USER}@${REMOTE_SERVER}:${FRONTEND_DIR}/public_html/

    # Copy package files for potential server-side operations
    echo "  → Copying package files..."
    rsync -avz package.json ${REMOTE_USER}@${REMOTE_SERVER}:${FRONTEND_DIR}/

    # Copy Next.js configuration
    echo "  → Copying Next.js configuration..."
    if [ -f "next.config.cjs" ]; then
        rsync -avz next.config.cjs ${REMOTE_USER}@${REMOTE_SERVER}:${FRONTEND_DIR}/
    fi

    # Copy production environment file
    if [ -f ".env.production" ]; then
        echo "  → Copying production environment..."
        rsync -avz .env.production ${REMOTE_USER}@${REMOTE_SERVER}:${FRONTEND_DIR}/.env
    fi

    # Restart frontend on server
    echo "🔄 Restarting frontend application..."
    ssh ${REMOTE_USER}@${REMOTE_SERVER} << 'EOF_FRONTEND'
        cd ~/domains/ckks.edu.pl/public_nodejs

        echo "Creating Passenger configuration if needed..."
        if [ ! -f ".passenger" ]; then
            cat > .passenger << 'EOF_PASSENGER_FRONTEND'
{
  "nodejs": "20.0.0",
  "startup_file": "server.js",
  "environment": "production",
  "document_root": "public_html"
}
EOF_PASSENGER_FRONTEND
        fi

        echo "Restarting frontend application..."
        devil www restart ckks.edu.pl
EOF_FRONTEND

    echo "✅ Frontend deployment completed"
}

# Function to verify deployments
verify_deployments() {
    echo "🔍 === VERIFYING DEPLOYMENTS ==="

    echo "⏳ Waiting for applications to start..."
    sleep 15

    # Check API
    echo "🔍 Checking API health..."
    if curl -f -s ${API_URL}/api/course > /dev/null; then
        echo "✅ API is responding correctly"
        echo "🌐 API Endpoint: ${API_URL}/api/course"
    else
        echo "⚠️  Warning: API might not be responding yet"
        echo "🌐 API Endpoint: ${API_URL}/api/course"
    fi

    # Check Frontend
    echo "🔍 Checking Frontend health..."
    if curl -f -s ${FRONTEND_URL} > /dev/null; then
        echo "✅ Frontend is responding correctly"
        echo "🌐 Frontend: ${FRONTEND_URL}"
    else
        echo "⚠️  Warning: Frontend might not be responding yet"
        echo "🌐 Frontend: ${FRONTEND_URL}"
    fi

    # Check integration
    echo "🔍 Checking Frontend-API integration..."
    if curl -f -s ${FRONTEND_URL}/api/course > /dev/null; then
        echo "✅ Frontend-API integration working"
        echo "🌐 Integration test: ${FRONTEND_URL}/api/course"
    else
        echo "⚠️  Warning: Frontend-API integration might not be working yet"
        echo "🌐 Integration test: ${FRONTEND_URL}/api/course"
    fi
}

# Main deployment process
main() {
    echo "🏗️  CKKS Production Deployment Script"
    echo "======================================="
    echo ""

    # Check if we're in the right directory
    check_project_root

    # Deploy API first (dependencies)
    deploy_api
    echo ""

    # Deploy Frontend second
    deploy_frontend
    echo ""

    # Verify both deployments
    verify_deployments
    echo ""

    echo "🎉 === DEPLOYMENT COMPLETED ==="
    echo "📋 Summary:"
    echo "   ✅ NestJS API deployed to: ${API_URL}"
    echo "   ✅ Next.js Frontend deployed to: ${FRONTEND_URL}"
    echo "   🔗 API Documentation: ${API_URL}/api/docs"
    echo ""
    echo "🔧 If you encounter issues:"
    echo "   1. Check server logs: ssh ${REMOTE_USER}@${REMOTE_SERVER}"
    echo "   2. Restart services: devil www restart api.ckks.pl && devil www restart ckks.edu.pl"
    echo "   3. Check Passenger logs in application directories"
    echo ""
    echo "🚀 Deployment successful!"
}

# Run the main function
main "$@"
