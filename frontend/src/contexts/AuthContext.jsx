import React, { createContext, useState, useEffect, useContext } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL + '/api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle automatic logout when website is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      // No need to clear token from localStorage if using httpOnly cookies
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User has switched tabs or minimized the browser
        // We could implement a timeout here if needed
      }
    };

    // Listen for page unload (closing tab/window)
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Listen for visibility changes (switching tabs, minimizing)
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Fetch user profile on component mount and when isAuthenticated changes
  useEffect(() => {
    fetchUserProfile();
  }, [isAuthenticated]); // Depend on isAuthenticated to refetch after login/logout

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // With credentials to send HTTP-only cookies
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsVerified(data.user.isVerified);
        setIsAuthenticated(true);
      } else {
        // If response is not OK, it means the token is invalid or expired
        // or user is not authenticated.
        // We should clear user data and set isAuthenticated to false.
        setUser(null);
        setIsVerified(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
      setIsVerified(false);
      setIsAuthenticated(false);
    }
  };

  const login = (userData) => {
    console.log('AuthContext: login function called with user data:', userData);
    // Token is now handled by httpOnly cookie, no need to store in localStorage
    setUser(userData);
    setIsVerified(userData.isVerified);
    setIsAuthenticated(true);
    console.log('AuthContext: isAuthenticated state after login attempt:', true);
  };

  const logout = async () => {
    console.log('AuthContext: logout function called');
    try {
      // Call backend logout endpoint to clear httpOnly cookie
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error during backend logout:', error);
    } finally {
      setUser(null);
      setIsVerified(false);
      setIsAuthenticated(false);
      console.log('AuthContext: isAuthenticated state after logout attempt:', false);
    }
  };
  
  console.log('AuthContext: Current isAuthenticated state:', isAuthenticated);
  console.log('AuthContext: Current user state:', user);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isVerified, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};