import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-buddy-lavender font-outfit">Terms of Service</h1>
          <p className="text-sm text-gray-500 mt-2">Last Updated: [Current Date - e.g., September 5, 2025]</p> {/* Placeholder for date */}
        </header>
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg p-8 md:p-12 max-w-3xl mx-auto prose prose-sm sm:prose-base lg:prose-lg prose-h2:font-outfit prose-h2:text-gray-800">
          <p className="lead text-lg text-gray-600 mb-6">Welcome to College Buddy! These terms outline the rules for using our platform.</p>

          <h2 id="overview">1. Overview of Our Services</h2>
          <p>College Buddy offers a student-focused platform with the following features:</p>
          <ul>
            <li>AI-powered study help (PYQs, important questions, YouTube resources)</li>
            <li>Personal To-Do List</li>
            <li>Community Notes Library</li>
            <li>Bunking Planner</li>
            <li>Chat-based assistant powered by RAG (Retrieval-Augmented Generation)</li>
          </ul>

          <h2 id="eligibility">👤 2. Eligibility</h2>
          <p>You must be 13 years or older to use College Buddy. By using the platform, you confirm that you meet this requirement.</p>

          <h2 id="user-accounts">🔐 3. User Accounts</h2>
          <p>You may use Google or other supported methods to sign in.</p>
          <ul>
            <li>You are responsible for keeping your login credentials safe.</li>
            <li>You agree not to misuse or attempt unauthorized access to the platform.</li>
          </ul>

          <h2 id="content-shared">📦 4. Content You Share</h2>
          <p>In the Notes Library, users can upload and view notes. You:</p>
          <ul>
            <li>Must ensure that any content you upload is your own or you have permission to share it.</li>
            <li>Grant College Buddy a non-exclusive right to display shared notes within the app.</li>
            <li>Agree not to upload harmful, illegal, or plagiarized content.</li>
          </ul>

          <h2 id="limitations">📉 5. Limitations of Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the app for cheating or academic misconduct.</li>
            <li>Spam, hack, or exploit the services in any way.</li>
            <li>Upload malicious code or attempt to disrupt the app’s functionality.</li>
          </ul>

          <h2 id="ai-disclaimer">🧠 6. AI Assistant Disclaimer</h2>
          <p>The AI tools (study tips, bunk planner, etc.) are designed to assist, not replace, your judgment or your institution’s rules. We do not guarantee 100% accuracy of AI-generated content.</p>

          <h2 id="communication">📬 7. Communication</h2>
          <p>We may contact you via email for important updates, new features, or feedback requests. You can opt out of promotional emails anytime.</p>

          <h2 id="termination">📉 8. Termination</h2>
          <p>We reserve the right to suspend or terminate access if you violate these Terms or misuse the platform in any way.</p>

          <h2 id="changes-terms">📜 9. Changes to Terms</h2>
          <p>We may revise these Terms as we improve College Buddy. We’ll notify you of any significant changes. Continued use of the app means you accept the updated terms.</p>
          
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

export default TermsOfServicePage;