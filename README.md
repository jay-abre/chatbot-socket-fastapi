# Chatbot Application

## Description
A WebSocket-based chat application using FastAPI for the backend and a simple HTML/JavaScript frontend. This application allows users to connect to a chat server and exchange messages in real-time.
## Setup
### Prerequisites
- Python 3.7+
- Node.js 
### How to run the code
1. **Navigate to the backend directory**:
   ```bash
   cd backend
2. **Create a virtual environment:**
   ```bash
   python -m venv venv
3. **Activate the virtual environment**
   ```bash
   venv\Scripts\activate // On Windows
   source venv/bin/activate // On macOS/Linux
4. **Run the backend**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
5. **Install the dependencies**
   ```bash
   pip install -r requirements.txt
6. **Navigate to the frontend directory**
   ```bash
   cd ../frontend
7. **Run the frontend**
   ```bash
   python -m http.server 3000 --directory .

