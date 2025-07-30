import React from 'react';
import { Copyright } from 'lucide-react';
import { Link } from 'react-router-dom'; // Added Link import

const Footer = () => {
  return (
    <footer className="mt-16 pt-10 pb-4 px-4 md:px-8"> {/* Removed background gradient classes */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-center sm:text-left">
          
          <div>
            <h3 className="text-xl font-outfit font-semibold text-gray-800 mb-3">College Buddy</h3>
            <p className="text-gray-700 text-sm">
              Your all-in-one campus companion.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-outfit font-semibold text-gray-800 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="text-gray-700 hover:text-buddy-lavender text-sm">About Us</Link></li>
              <li><Link to="/contact-us" className="text-gray-700 hover:text-buddy-lavender text-sm">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-700 hover:text-buddy-lavender text-sm">FAQ</Link></li> {/* Placeholder FAQ */}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-outfit font-semibold text-gray-800 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-700 hover:text-buddy-lavender text-sm">Privacy Policy</Link></li> {/* Placeholder */}
              <li><Link to="/terms-of-service" className="text-gray-700 hover:text-buddy-lavender text-sm">Terms of Service</Link></li> {/* Placeholder */}
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="flex items-center justify-center text-sm text-gray-600 gap-1">
            <Copyright className="h-4 w-4" /> 
            <span>2025 College Buddy – Made with caffeine & chaos by real students.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
