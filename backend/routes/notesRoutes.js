const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Notes = require('../models/notesModel');
const router = express.Router();

// Configure Cloudinary (only if environment variables are set)
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('Cloudinary configured successfully');
} else {
  console.log('Cloudinary not configured - using local file storage fallback');
}

// Configure Multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific file types
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and PPT files are allowed.'), false);
    }
  }
});

// Upload a new note
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Upload request received:', {
      body: req.body,
      file: req.file ? { name: req.file.originalname, size: req.file.size, type: req.file.mimetype } : 'No file'
    });

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, subject, course, semester, description, tags } = req.body;
    const file = req.file;

    // Validate required fields
    if (!title || !subject || !course || !semester) {
      return res.status(400).json({ error: 'Missing required fields: title, subject, course, semester' });
    }

    let fileUrl = '';
    let publicId = '';

    // Try to upload to Cloudinary if configured
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              resource_type: 'auto',
              folder: 'college-buddy/notes',
              public_id: `${Date.now()}_${file.originalname}`,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(file.buffer);
        });
        
        fileUrl = result.secure_url;
        publicId = result.public_id;
        console.log('File uploaded to Cloudinary:', fileUrl);
      } catch (cloudinaryError) {
        console.error('Cloudinary upload failed:', cloudinaryError);
        // Fallback to local storage or error
        return res.status(500).json({ error: 'File upload to cloud storage failed' });
      }
    } else {
      // Fallback: create a mock URL for testing
      fileUrl = `https://example.com/notes/${Date.now()}_${file.originalname}`;
      console.log('Using mock file URL for testing:', fileUrl);
    }

    // Create new note in database
    const newNote = new Notes({
      title,
      subject,
      course,
      semester,
      uploader: req.body.uploader || 'Anonymous',
      fileName: file.originalname,
      fileUrl: fileUrl,
      fileSize: file.size,
      fileType: file.mimetype,
      description: description || '',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    const savedNote = await newNote.save();
    console.log('Note saved to database:', savedNote._id);
    
    res.status(201).json({
      message: 'Note uploaded successfully',
      note: savedNote
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload note',
      details: error.message 
    });
  }
});

// Get all notes with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { course, semester, search, page = 1, limit = 12 } = req.query;
    
    console.log('Fetching notes with filters:', { course, semester, search, page, limit });
    
    // Build filter object
    const filter = {};
    if (course && course !== 'All') filter.course = course;
    if (semester && semester !== 'All') filter.semester = semester;
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    const notes = await Notes.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Notes.countDocuments(filter);

    console.log(`Found ${notes.length} notes out of ${total} total`);

    res.json({
      notes,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch notes', details: error.message });
  }
});

// Get a specific note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch note', details: error.message });
  }
});

// Like/unlike a note
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const note = await Notes.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const userLiked = note.likedBy.includes(userId);
    
    if (userLiked) {
      // Unlike
      note.likedBy = note.likedBy.filter(id => id !== userId);
      note.likes = Math.max(0, note.likes - 1);
    } else {
      // Like
      note.likedBy.push(userId);
      note.likes += 1;
    }

    await note.save();
    res.json({ likes: note.likes, liked: !userLiked });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ error: 'Failed to update like', details: error.message });
  }
});

// Download a note (increment download count)
router.post('/:id/download', async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.downloads += 1;
    await note.save();
    
    console.log(`Download recorded for note: ${note.title}`);
    
    res.json({ 
      message: 'Download recorded',
      downloads: note.downloads,
      fileUrl: note.fileUrl
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to record download', details: error.message });
  }
});

// Delete a note (only by uploader or admin)
router.delete('/:id', async (req, res) => {
  try {
    const { uploader } = req.body;
    const note = await Notes.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if user is the uploader (basic authorization)
    if (note.uploader !== uploader) {
      return res.status(403).json({ error: 'Not authorized to delete this note' });
    }

    // Delete from Cloudinary if configured and file exists
    if (process.env.CLOUDINARY_CLOUD_NAME && note.fileUrl && note.fileUrl.includes('cloudinary')) {
      try {
        const publicId = note.fileUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        console.log('File deleted from Cloudinary');
      } catch (cloudinaryError) {
        console.error('Failed to delete from Cloudinary:', cloudinaryError);
      }
    }

    // Delete from database
    await Notes.findByIdAndDelete(req.params.id);
    
    console.log(`Note deleted: ${note.title}`);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete note', details: error.message });
  }
});

module.exports = router;
