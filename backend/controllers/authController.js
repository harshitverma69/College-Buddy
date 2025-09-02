const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '24h'
  });
};

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other services like 'Outlook', 'Yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send OTP email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'College Buddy - OTP Verification',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>OTP Verification</h2>
        <p>Hello,</p>
        <p>Thank you for registering with College Buddy. Please use the following One-Time Password (OTP) to verify your email address:</p>
        <h3 style="color: #007bff; font-size: 24px;">${otp}</h3>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,</p>
        <p>The College Buddy Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    // Generate OTP
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6-character OTP
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Create new user
    const user = new User({
      name,
      email,
      password,
      otp,
      otpExpires,
      isVerified: false
    });

    await user.save();

    // Send OTP email
    await sendOtpEmail(email, otp);

    res.status(201).json({
      msg: 'User registered successfully. Please check your email for OTP verification.',
      userId: user._id,
      email: user.email
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      msg: 'Email verified successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json({ msg: 'Email not verified. Please verify your email using the OTP sent during registration.' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// Logout user (client-side token removal is sufficient for JWT, but we can add a blacklist if needed)
exports.logout = (req, res) => {
  // For JWT, logout is typically handled client-side by removing the token.
  // If server-side token invalidation (e.g., blacklisting) is required,
  // it would be implemented here. For now, we just send a success message.
  res.json({ msg: 'Logged out successfully' });
};

// Get user profile (protected route)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User with that email does not exist' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset password email
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`; // Frontend URL
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'College Buddy - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          <p>Best regards,</p>
          <p>The College Buddy Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired.' });
    }

    user.password = password; // Mongoose pre-save hook will hash this
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.isVerified = true; // Ensure user is verified after password reset
    await user.save();

    res.status(200).json({ msg: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
