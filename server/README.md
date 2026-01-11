# AI Website Builder - Server

Backend server for the AI Website Builder application. Handles AI-powered website generation and file downloads.

## Features

- RESTful API endpoints for website generation
- Integration with Google GenAI (Gemini) for AI-powered code generation
- ZIP file generation for website downloads
- CORS enabled for cross-origin requests
- Health check endpoint

## API Endpoints

### POST /api/generate
Generate website code from a text prompt.

**Request Body:**
```json
{
  "prompt": "Create a portfolio website for a photographer"
}
```

**Response:**
```json
{
  "html": "<div>...</div>",
  "css": "body { ... }",
  "js": "console.log('Hello');",
  "title": "Photography Portfolio"
}
```

### POST /api/download
Generate a ZIP file containing the website code.

**Request Body:**
```json
{
  "html": "<div>...</div>",
  "css": "body { ... }",
  "js": "console.log('Hello');",
  "title": "Website Title"
}
```

**Response:** ZIP file download

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```bash
PORT=3001
GOOGLE_API_KEY=your_google_api_key_here
```

4. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `GOOGLE_API_KEY` - Your Google AI API key (required for real AI generation)

## Development Notes

- Without `GOOGLE_API_KEY`, the server uses mock responses for development
- The server includes CORS middleware for cross-origin requests
- File size limit for requests is set to 10MB
- Uses ES modules (type: "module" in package.json)

## Dependencies

### Production
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `@google/genai` - Google GenAI API client
- `jszip` - ZIP file generation

### Development
- `nodemon` - Auto-restart server during development

## Error Handling

The server includes comprehensive error handling for:
- Missing required fields
- API key configuration issues
- Google GenAI API errors
- File generation errors

All errors return appropriate HTTP status codes and JSON error messages.
