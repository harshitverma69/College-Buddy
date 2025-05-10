const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Super early log for all requests to see if they even hit the app
app.use((req, res, next) => {
  console.log(`Backend: Incoming request: ${req.method} ${req.originalUrl}`);
  if (req.originalUrl.startsWith('/api/auth/login')) {
    console.log('Backend: Request to /api/auth/login detected early. Body:', req.body);
  }
  next();
});

app.use(cors());
app.use(express.json()); // Make sure express.json() is before routes that need parsed body

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("Mongo error: ", err));

// Import auth routes
const authRoutes = require('./routes/auth');

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
