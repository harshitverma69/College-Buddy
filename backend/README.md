# College Buddy Backend

This is the backend server for the College Buddy application, providing APIs for notes management and other features.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Connection (Required)
MONGO_URI=mongodb://localhost:27017/college-buddy

# Cloudinary Configuration (Optional - for file storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Note**: If you don't set up Cloudinary, the system will use mock URLs for testing purposes.

### 3. Start MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or if using MongoDB Community Server, start the service from Services
```

**macOS/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or start manually
mongod
```

### 4. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Notes Management
- `POST /api/notes/upload` - Upload a new note
- `GET /api/notes` - Get all notes with filtering
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes/:id/like` - Like/unlike a note
- `POST /api/notes/:id/download` - Download a note
- `DELETE /api/notes/:id` - Delete a note

### Health Check
- `GET /health` - Server health status

## File Upload Support

- **Supported formats**: PDF, DOCX, PPT, PPTX
- **Maximum file size**: 10MB
- **Storage**: Files are stored in Cloudinary (if configured) or use mock URLs for testing

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Make sure MongoDB is running
   - Check if the MONGO_URI is correct
   - Verify MongoDB is accessible on the specified port

2. **File Upload Fails**
   - Check if the file size is under 10MB
   - Verify the file type is supported (PDF, DOCX, PPT)
   - If using Cloudinary, ensure credentials are correct

3. **CORS Issues**
   - The server is configured to allow all origins in development
   - For production, configure CORS settings appropriately

### Debug Mode

The server includes extensive logging. Check the console output for:
- Upload request details
- File processing status
- Database operations
- Error details

## Development

### Project Structure
```
backend/
├── models/          # Database models
├── routes/          # API route handlers
├── config/          # Configuration files
├── controllers/     # Business logic (if needed)
├── server.js        # Main server file
└── package.json     # Dependencies
```

### Adding New Features

1. Create models in `models/` directory
2. Add routes in `routes/` directory
3. Update `server.js` to include new routes
4. Test with the frontend application

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure proper MongoDB connection string
3. Set up Cloudinary for file storage
4. Configure CORS for your domain
5. Use a process manager like PM2
6. Set up proper logging and monitoring

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running and accessible
4. Check if all dependencies are installed correctly




