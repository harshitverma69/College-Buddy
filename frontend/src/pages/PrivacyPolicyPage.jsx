import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-buddy-lavender font-outfit">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-2">Effective Date: [Current Date - e.g., September 5, 2025]</p> {/* Placeholder for date */}
        </header>
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg p-8 md:p-12 max-w-3xl mx-auto prose prose-sm sm:prose-base lg:prose-lg prose-h2:font-outfit prose-h2:text-gray-800">
          <p className="lead text-lg text-gray-600 mb-6">Your privacy is important to us. This Privacy Policy explains how College Buddy collects, uses, and protects your information.</p>
          
          <h2 id="info-collect">🔍 1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <h3>A. Personal Information</h3>
          <ul>
            <li>Email address (if you sign in using Google or other methods)</li>
            <li>Name (if available from your sign-in method)</li>
            <li>College name or year (if optionally provided by you)</li>
          </ul>
          <h3>B. Usage Data</h3>
          <ul>
            <li>Pages visited</li>
            <li>Features used (e.g., To-Do List, Notes Library, AI Assistant)</li>
            <li>Device type and browser version (for performance improvement)</li>
          </ul>

          <h2 id="how-we-use">🛠 2. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Provide and personalize your experience on College Buddy</li>
            <li>Improve our platform features and content</li>
            <li>Enable login and user-specific functionality (e.g., save your notes and to-dos)</li>
            <li>Debug errors and enhance performance</li>
          </ul>

          <h2 id="data-security">🔐 3. Data Security</h2>
          <p>We take your privacy seriously. Data is securely stored using trusted cloud platforms (e.g., Supabase, Firebase, or similar services). We do not share or sell your personal data to third parties.</p>

          <h2 id="ai-features">🧠 4. AI Features and Data</h2>
          <p>When you use our AI-powered tools (like Study Help), your queries may be processed using large language models to provide better responses. These queries are not linked back to your personal identity.</p>

          <h2 id="third-party">🔁 5. Third-Party Services</h2>
          <p>We may use third-party tools such as:</p>
          <ul>
            <li>Google Authentication (for login)</li>
            <li>Analytics services (to understand how users engage with the app)</li>
          </ul>
          <p>These services may collect information according to their own privacy policies.</p>

          <h2 id="your-rights">❌ 6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request deletion of your account or data</li>
            <li>Opt out of optional data collection</li>
            <li>Contact us for any privacy-related concerns</li>
          </ul>
          <h2 id="children-policy">👶 7. No Use by Children Under 13</h2>
          <p>College Buddy is intended for users aged 13 and older. We do not knowingly collect data from children.</p>

          <h2 id="updates-policy">🔄 8. Updates to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. When we do, we will update the "Effective Date" at the top of this page.</p>
          
          <div className="text-center mt-12">
            <Link to="/" className="cta-button inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;