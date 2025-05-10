const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token (Login)
// @access  Public
router.post('/login', async (req, res) => {
  console.log('Backend: /api/auth/login route hit');
  const { email, password } = req.body;
  console.log('Backend: Login attempt with email:', email);

  try {
    console.log('Backend: Searching for user...');
    let user = await User.findOne({ email });
    console.log('Backend: User.findOne result:', user ? `User found: ${user.id}` : 'User not found');

    if (!user) {
      console.log('Backend: User not found, sending 400');
      return res.status(400).json({ msg: 'Invalid credentials - user not found' });
    }

    console.log('Backend: Comparing password...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Backend: bcrypt.compare result:', isMatch);

    if (!isMatch) {
      console.log('Backend: Password does not match, sending 400');
      return res.status(400).json({ msg: 'Invalid credentials - password mismatch' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    console.log('Backend: Payload for JWT:', payload);
    console.log('Backend: JWT_SECRET from env:', process.env.JWT_SECRET ? 'Exists' : 'MISSING or undefined');

    console.log('Backend: Attempting to sign JWT...');
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Expires in 1 hour
      (err, token) => {
        if (err) {
          console.error('Backend: JWT sign error:', err.message, err.stack);
          // It's important to send a response here, otherwise the request hangs
          // and might lead to the frontend's SyntaxError if it expects JSON.
          return res.status(500).json({ msg: 'Server error during token generation.', error: err.message });
        }
        console.log('Backend: JWT signed successfully. Token:', token ? 'Generated' : 'Not generated');
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Backend: Error in /login route catch block:', err.message, err.stack);
    res.status(500).send('Server error from catch block'); // Ensure this sends a response
  }
});

module.exports = router;