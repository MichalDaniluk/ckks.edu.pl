#!/bin/bash

# CKKS Development Environment Startup Script
# This script starts both the Next.js frontend and NestJS API

echo "🚀 Starting CKKS Development Environment..."

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "❌ Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Function to start API
start_api() {
    echo "🔧 Starting NestJS API on port 3001..."
    cd ../ckks-api
    npm run start:dev &
    API_PID=$!
    cd ../ckks-nextjs
    echo "📝 API PID: $API_PID"
}

# Function to start frontend
start_frontend() {
    echo "🖥️  Starting Next.js Frontend on port 3000..."
    npm run dev &
    FRONTEND_PID=$!
    echo "📝 Frontend PID: $FRONTEND_PID"
}

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping development servers..."
    if [ ! -z "$API_PID" ]; then
        kill $API_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    echo "✅ Development servers stopped"
    exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Check if required ports are available
echo "🔍 Checking port availability..."
check_port 3000
check_port 3001

# Start API first
start_api

# Wait for API to start
echo "⏳ Waiting for API to start..."
sleep 5

# Start frontend
start_frontend

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 3

echo "🎉 Development environment started successfully!"
echo "📋 URLs:"
echo "   - Frontend: http://localhost:3000"
echo "   - API:      http://localhost:3001"
echo "   - API Docs: http://localhost:3001/api/docs"
echo ""
echo "💡 Press Ctrl+C to stop both servers"

# Wait for user interruption
wait