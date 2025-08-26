#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎓 College Buddy Backend Setup');
console.log('===============================\n');

// Check if .env already exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      createEnvFile();
    } else {
      console.log('Setup cancelled. Your existing .env file is preserved.');
    }
    rl.close();
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  const envContent = `# MongoDB Connection (Required)
# Make sure MongoDB is running on your system
MONGO_URI=mongodb://localhost:27017/college-buddy

# JWT Secret (Required for authentication)
# Change this to a secure random string in production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration (Optional - for file storage)
# Get these from https://cloudinary.com/console
# If not set, the system will use mock URLs for testing
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
NODE_ENV=development
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Start MongoDB on your system');
    console.log('2. (Optional) Set up Cloudinary for file storage');
    console.log('3. Run: npm install');
    console.log('4. Run: npm run dev');
    console.log('\n🚀 Your backend will be available at http://localhost:5000');
    console.log('\n🔐 Authentication endpoints:');
    console.log('   - POST /api/auth/register - User registration');
    console.log('   - POST /api/auth/login - User login');
    console.log('   - GET /api/auth/profile - Get user profile (protected)');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
    console.log('\n📝 Please create the .env file manually with the following content:');
    console.log(envContent);
  }
}

