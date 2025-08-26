# College Buddy - Complete Setup Guide

This guide will help you set up and run the College Buddy application, which allows authenticated users to upload study notes and all users to browse and download them.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd College-Buddy
```

## 📚 Backend Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Set up Environment Variables
```bash
# Run the setup script
npm run setup

# Or manually create .env file with:
MONGO_URI=mongodb://localhost:27017/college-buddy
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
NODE_ENV=development
```

**Note**: Cloudinary is optional. If not configured, the system will use mock URLs for testing.

### Step 3: Start MongoDB
**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**macOS/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
```

### Step 4: Start Backend Server
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

✅ Backend will be running at `http://localhost:5000`

## 🎨 Frontend Setup

### Step 1: Install Dependencies
```bash
cd ../frontend
npm install
```

### Step 2: Set up Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Start Frontend Development Server
```bash
npm run dev
```

✅ Frontend will be running at `http://localhost:5173`

## 🔧 Configuration Options

### MongoDB Setup
- **Local MongoDB**: Install MongoDB Community Server
- **MongoDB Atlas**: Use cloud-hosted MongoDB (free tier available)
- **Connection String**: Update `MONGO_URI` in backend `.env`

### Cloudinary Setup (Optional)
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and secret
3. Update the backend `.env` file
4. Files will be stored in the cloud

### Supabase Setup (Authentication)
1. Create project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Update the frontend `.env` file
4. Enable email authentication in Supabase dashboard

## 🧪 Testing the Application

### 1. Backend Health Check
Visit `http://localhost:5000/health` to verify the server is running.

### 2. Frontend Access
Open `http://localhost:5173` in your browser.

### 3. Test Notes Upload
1. Navigate to the Notes Library
2. Click "Upload Notes" (requires authentication)
3. Fill in the form and upload a file
4. Verify the note appears in the library

### 4. Test Notes Browsing
1. Browse the notes library
2. Use filters to find specific notes
3. Download or view notes
4. Test the search functionality

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues
1. **MongoDB Connection Failed**
   ```bash
   # Check if MongoDB is running
   # Windows: net start MongoDB
   # macOS/Linux: sudo systemctl status mongod
   ```

2. **Port Already in Use**
   ```bash
   # Change PORT in .env file
   # Or kill the process using the port
   ```

3. **Missing Dependencies**
   ```bash
   cd backend
   npm install
   ```

#### Frontend Issues
1. **Build Errors**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **API Connection Failed**
   - Verify backend is running on port 5000
   - Check CORS settings
   - Verify API endpoints

3. **Authentication Issues**
   - Check Supabase configuration
   - Verify environment variables
   - Clear browser cache

### Debug Mode
Both frontend and backend include extensive logging:
- Check browser console for frontend errors
- Check terminal for backend logs
- Use browser dev tools to inspect network requests

## 📁 Project Structure

```
College-Buddy/
├── backend/                 # Backend server
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
├── frontend/               # Frontend application
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── lib/            # Utility functions
│   ├── package.json        # Frontend dependencies
│   └── .env                # Frontend environment variables
└── README.md               # Project documentation
```

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Configure production MongoDB
3. Set up Cloudinary for file storage
4. Use PM2 or similar process manager
5. Configure reverse proxy (nginx)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables
4. Set up custom domain if needed

## 📚 API Documentation

### Notes Endpoints
- `POST /api/notes/upload` - Upload a new note
- `GET /api/notes` - Get all notes with filtering
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes/:id/like` - Like/unlike a note
- `POST /api/notes/:id/download` - Download a note
- `DELETE /api/notes/:id` - Delete a note

### Health Check
- `GET /health` - Server health status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review the logs and error messages
3. Verify all configurations
4. Check the documentation

## 🎯 Features

- ✅ **Notes Upload**: Authenticated users can upload study materials
- ✅ **Notes Library**: Browse and search all shared notes
- ✅ **File Support**: PDF, DOCX, PPT formats up to 10MB
- ✅ **Authentication**: Secure user login system
- ✅ **Search & Filter**: Find notes by course, semester, or keywords
- ✅ **Download & View**: Access notes offline or online
- ✅ **Like System**: Rate useful notes
- ✅ **Responsive Design**: Works on all devices

## 🔒 Security Features

- File type validation
- File size limits
- User authentication for uploads
- CORS protection
- Input validation and sanitization

---

**Happy coding! 🎓✨**

