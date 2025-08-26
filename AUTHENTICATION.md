# Authentication System

This document describes the authentication system implemented in College Buddy.

## Overview

The authentication system has been updated to remove Google sign-in and implement a custom email/password authentication system with automatic logout when the website is closed.

## Features

- **User Registration**: Users can create accounts with name, email, and password
- **User Login**: Secure login with email and password
- **JWT Tokens**: Secure authentication using JSON Web Tokens
- **Automatic Logout**: Users are automatically logged out when they close the website
- **Protected Routes**: API endpoints can be protected using authentication middleware

## Backend Implementation

### Dependencies Added
- `bcryptjs`: For password hashing
- `jsonwebtoken`: For JWT token generation and verification

### New Files Created
- `models/userModel.js`: User data model with password hashing
- `controllers/authController.js`: Authentication logic (register, login, profile)
- `middleware/auth.js`: Authentication middleware for protecting routes
- `routes/authRoutes.js`: Authentication API endpoints

### API Endpoints

#### Public Routes
- `POST /api/auth/register` - User registration
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
  - Returns: JWT token and user data

- `POST /api/auth/login` - User login
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: JWT token and user data

#### Protected Routes
- `GET /api/auth/profile` - Get user profile
  - Headers: `Authorization: Bearer <token>`
  - Returns: User profile data

## Frontend Implementation

### Changes Made
- Removed Google sign-in functionality
- Updated `AuthContext` to handle automatic logout
- Enhanced sign-in and sign-up forms
- Added loading states and better error handling
- Updated navbar to show user information

### Automatic Logout
The system automatically logs out users when:
- They close the browser tab/window
- They navigate away from the website
- The JWT token expires

### User Experience
- Users see their name displayed in the navbar when logged in
- Loading states during authentication operations
- Clear error messages for failed operations
- Smooth navigation after successful authentication

## Setup Instructions

### Backend Setup
1. Install new dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Set up environment variables:
   ```bash
   npm run setup
   ```
   This will create a `.env` file with the required JWT secret.

3. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. The frontend will automatically work with the new authentication system
2. No additional setup required

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt
- **JWT Tokens**: Secure, time-limited authentication tokens
- **Input Validation**: Server-side validation of all inputs
- **CORS Protection**: Cross-origin request protection
- **Environment Variables**: Sensitive data stored in environment variables

## Usage Examples

### Registering a New User
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securepassword123'
  })
});
```

### Logging In
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securepassword123'
  })
});
```

### Accessing Protected Routes
```javascript
const response = await fetch('/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## Migration Notes

- Google sign-in functionality has been completely removed
- Existing users will need to register new accounts
- The authentication system is backward compatible with existing protected routes
- All authentication state is managed locally and cleared on page close

## Future Enhancements

- Password reset functionality
- Email verification
- Remember me functionality
- Social login alternatives (if needed)
- Two-factor authentication
