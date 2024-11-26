#!/bin/bash

# Navigate to the backend directory
cd backend

# Check if the virtual environment directory exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate the virtual environment
source venv/Scripts/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &

# Navigate back to the root directory
cd ..

# Start the frontend
python -m http.server 3000 --directory frontend/public &

# Wait for both processes to finish
wait