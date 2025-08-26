import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/');
    };

    return (<nav className="bg-white bg-opacity-80 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <span className="text-2xl font-bold text-buddy-lavender font-outfit">College Buddy</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/'
            ? 'text-buddy-lavender'
            : 'text-gray-700 hover:text-buddy-lavender'}`}>
                Home
              </Link>
              <Link to="/study-tips" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/study-tips'
            ? 'text-buddy-lavender'
            : 'text-gray-700 hover:text-buddy-lavender'}`}>
                Study
              </Link>
              <Link to="/todo" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/todo'
            ? 'text-buddy-lavender'
            : 'text-gray-700 hover:text-buddy-lavender'}`}>
                Todo
              </Link>
              <Link to="/bunk-classes" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/bunk-classes'
            ? 'text-buddy-lavender'
            : 'text-gray-700 hover:text-buddy-lavender'}`}>
                Bunk
              </Link>
              <Link to="/notes" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/notes'
            ? 'text-buddy-lavender'
            : 'text-gray-700 hover:text-buddy-lavender'}`}>
                Notes
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:block">
                  Welcome, {user?.name || 'User'}!
                </span>
                <Button
                  variant="outline"
                  className="border-buddy-lavender text-buddy-lavender hover:bg-buddy-lavender hover:text-white"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/signin">
                <Button variant="outline" className="border-buddy-lavender text-buddy-lavender hover:bg-buddy-lavender hover:text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>);
};
export default Navbar;
