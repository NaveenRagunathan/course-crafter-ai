# CourseCraft API

Backend API for generating and exporting course content in various formats.

## Features

- Generate course content using OpenAI's GPT-4
- Export courses as TXT or PDF
- Simple REST API
- File management with unique IDs

## Prerequisites

- Node.js 14.0.0 or higher
- npm or yarn
- OpenAI API key

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the example environment file and update with your API key:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your OpenAI API key.

## Running the Server

```bash
# Development
npm start

# Production (with process manager like PM2)
NODE_ENV=production npm start
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Generate Course

**POST** `/generate`

Generate a new course and export it in the specified format.

**Request Body:**
```json
{
  "coursePrompt": "Your course topic or idea",
  "format": "pdf"  // or "txt"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Course generated successfully",
  "fileUrl": "http://localhost:5000/123e4567-e89b-12d3-a456-426614174000.pdf",
  "fileId": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Missing coursePrompt or format"
}
```

### Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2023-01-01T00:00:00.000Z"
}
```

## Environment Variables

- `PORT` - Port to run the server on (default: 5000)
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `NODE_ENV` - Environment (development/production)
- `BASE_URL` - Base URL for file downloads (default: http://localhost:PORT)

## File Storage

Generated files are stored in the `exports` directory. Make sure this directory is writable by the Node.js process.

## License

MIT
