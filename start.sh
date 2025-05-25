#!/bin/bash

# Function to handle script termination
cleanup() {
  echo "Shutting down..."
  # Kill all child processes
  pkill -P $$
  exit 0
}

# Set up trap to catch termination signals
trap cleanup SIGINT SIGTERM

# Start backend
echo "Starting backend..."
cd backend
if [ ! -d "node_modules" ]; then
  npm install || {
    echo "npm install failed. Trying with --legacy-peer-deps..."
    npm install --legacy-peer-deps || {
      echo "npm install failed even with --legacy-peer-deps. Please check your dependencies."
      exit 1
    }
  }
fi
npm run dev &

# Start frontend
echo "Starting frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
  npm install
fi
if ! npx --no vite --version > /dev/null 2>&1; then
  npm install vite --save-dev
fi
npm run dev &

# Keep the script running
wait
