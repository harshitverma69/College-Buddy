import React from 'react';
import { supabase } from '../lib/supabaseClient'; // Adjusted path

const LoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        console.error('Error logging in with Google:', error.message);
        alert(`Error logging in: ${error.message}`);
      }
    } catch (error) {
      console.error('Unexpected error during Google login:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      Login with Google
    </button>
  );
};

export default LoginButton;