# AI Website Builder - Run Instructions

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

## Setup Steps

### 1. Install Dependencies

**Server Dependencies:**
```bash
cd server
npm install
```

**Client Dependencies:**
```bash
cd ../client
npm install
```

### 2. Environment Setup

**Server Environment:**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file and add your Google API key (optional for development)
# GOOGLE_API_KEY=your_google_api_key_here
```

**Client Environment:**
```bash
# Copy the example environment file  
cp .env.example .env

# The default API URL should work for local development
# VITE_API_URL=http://localhost:3001
```

### 3. Running the Application

**Start the Backend Server:**
```bash
cd server
npm run dev
```
Server will run on: http://localhost:3001

**Start the Frontend Development Server:**
```bash
cd client
npm run dev
```
Client will run on: http://localhost:5173

### 4. Using the Application

1. Open your browser and go to http://localhost:5173
2. Enter a website description in the prompt form (e.g., "Create a portfolio website for a photographer")
3. Click "Generate Website"
4. View the live preview and generated code
5. Download the website as a ZIP file

### Development Notes

- Without a Google API key, the app uses mock responses for development
- The server includes health check at http://localhost:3001/api/health
- Hot reload is enabled for both client and server during development

### Production Build

**Build Client for Production:**
```bash
cd client
npm run build
```

**Start Production Server:**
```bash
cd server
npm start
```

### Testing

**Test the API endpoints:**
```bash
# Health check
curl http://localhost:3001/api/health

# Generate website (example)
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Create a simple landing page"}'
```

### Troubleshooting

**Common Issues:**
1. **Port already in use**: Change ports in .env files
2. **CORS errors**: Ensure server is running on port 3001
3. **Build errors**: Check Node.js version and clean node_modules

**Reset:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

The application is now ready to use! You can start generating websites from natural language prompts.
