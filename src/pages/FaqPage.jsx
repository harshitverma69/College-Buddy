import React from 'react';
import { Link } from 'react-router-dom';

const FaqPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-buddy-lavender font-outfit">Frequently Asked Questions</h1>
        </header>
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
          <p className="text-gray-700 text-center text-lg">There are no questions till now.</p>
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

export default FaqPage;