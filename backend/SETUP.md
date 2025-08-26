# Backend Setup Guide

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/college-buddy

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update MONGO_URI in .env file

3. **Set up Cloudinary**
   - Create a Cloudinary account at https://cloudinary.com/
   - Get your cloud name, API key, and API secret
   - Update the .env file with your credentials

4. **Start the Server**
   ```bash
   npm start
   # or
   node server.js
   ```

## API Endpoints

- `POST /api/notes/upload` - Upload a new note
- `GET /api/notes` - Get all notes with filtering
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes/:id/like` - Like/unlike a note
- `POST /api/notes/:id/download` - Download a note
- `DELETE /api/notes/:id` - Delete a note

## File Upload Support

- **Supported formats**: PDF, DOCX, PPT, PPTX
- **Maximum file size**: 10MB
- **Storage**: Files are stored in Cloudinary cloud storage
