
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

const MessageSent = () => {
  const navigate = useNavigate();

  // Auto-redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="max-w-md mx-auto mt-16 p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm text-center">
          <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-buddy-lavender/20 flex items-center justify-center">
            <Mail className="h-8 w-8 text-buddy-lavender" />
          </div>
          <h1 className="text-3xl font-outfit font-semibold text-gray-800 mb-4">
            Thanks for reaching out!
          </h1>
          <p className="text-gray-700 mb-6">
            We'll get back to you soon.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="cta-button"
          >
            Return to Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MessageSent;
