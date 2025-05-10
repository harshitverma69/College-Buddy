import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '../lib/supabaseClient'; // Import Supabase client

const SignInPage = () => {
  const [step, setStep] = useState('initialQuestion'); // 'initialQuestion', 'kietLogin', 'otherLogin', 'emailPasswordLogin'
  const [libraryId, setLibraryId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Add state for email
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate(); // For redirection

  const handleKietLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual KIET sign-in logic
    console.log('Attempting KIET login with Library ID:', libraryId, 'Password:', password);
    alert(`KIET Student Login Attempt:\nLibrary ID: ${libraryId}\n(Password not shown for security)`);
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        console.error('Error logging in with Google:', error.message);
        alert(`Error logging in: ${error.message}`);
      }
      // Supabase handles the redirect, no explicit redirect here is usually needed
      // unless you want to navigate to a specific page *before* Supabase redirects.
    } catch (error) {
      console.error('Unexpected error during Google login:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    console.log('SignInPage: handleEmailPasswordLogin triggered'); // Add this log
    try {
      const response = await fetch('/api/auth/login', { // Ensure your backend runs on the same domain or configure CORS
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Login API response data:', data); // Log API response

      if (!response.ok) {
        console.error('Login API error response:', data);
        throw new Error(data.msg || 'Failed to login');
      }

      console.log('Token received:', data.token); // Log the token
      login(data.token); // Use login function from AuthContext
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login failed: ${error.message}`);
      // Reset password field or show error to user
      setPassword('');
    }
  };

  const renderInitialQuestion = () => (
    <>
      <p className="text-center text-lg mb-6">Are you a student of KIET Ghaziabad?</p>
      <div className="flex justify-around">
        <Button onClick={() => setStep('kietLogin')} className="cta-button">
          Yes, I am
        </Button>
        <Button onClick={() => setStep('otherLogin')} variant="outline" className="border-buddy-lavender text-buddy-lavender">
          No, I'm not
        </Button>
      </div>
    </>
  );

  const renderKietLogin = () => (
    <form onSubmit={handleKietLoginSubmit} className="space-y-6">
      <CardDescription className="text-center pb-2">
        Please enter your KIET Library ID and Password.
      </CardDescription>
      <div>
        <Label htmlFor="libraryId">KIET Library ID</Label>
        <Input
          id="libraryId"
          type="text"
          placeholder="Enter your Library ID"
          value={libraryId}
          onChange={(e) => setLibraryId(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="password-kiet">Password</Label> {/* Changed id to avoid conflict */}
        <Input
          id="password-kiet"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full cta-button">
        Sign In with KIET ID
      </Button>
      <Button variant="link" onClick={() => setStep('initialQuestion')} className="w-full text-buddy-lavender">
        Not a KIET student?
      </Button>
    </form>
  );

  const renderEmailPasswordLogin = () => {
    console.log('SignInPage: renderEmailPasswordLogin called, current step:', step); // Log when this form is rendered
    return (
    <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
      <CardDescription className="text-center pb-2">
        Sign in with your email and password.
      </CardDescription>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="password-email">Password</Label> {/* Changed id to avoid conflict */}
        <Input
          id="password-email"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <Button
        type="submit"
        className="w-full cta-button"
        onClick={() => console.log('SignInPage: Email/Password form SUBMIT BUTTON CLICKED')}
      >
        Sign In
      </Button>
      <Button variant="link" onClick={() => setStep('otherLogin')} className="w-full text-buddy-lavender">
        Other sign-in options
      </Button>
    </form>
    );
  };


  const renderOtherLogin = () => (
    <div className="text-center space-y-4">
      <p>Please sign in using one of the options below, or register for a new account.</p>
      <Button onClick={() => setStep('emailPasswordLogin')} className="w-full cta-button">
        Sign In with Email/Password
      </Button>
      <Button onClick={handleGoogleSignIn} className="w-full bg-red-600 hover:bg-red-700 text-white mt-2">
        {/* Placeholder for Google Icon */}
        Sign In with Google
      </Button>
      <Link to="/signup" className="w-full block mt-2">
        <Button variant="outline" className="w-full border-buddy-lavender text-buddy-lavender">
          Register New Account
        </Button>
      </Link>
      <Button variant="link" onClick={() => setStep('initialQuestion')} className="w-full text-buddy-lavender pt-2">
        Actually, I am a KIET student
      </Button>
    </div>
  );

  console.log('SignInPage: Rendering with step:', step); // Log current step on each render
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-outfit text-buddy-lavender">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'initialQuestion' && renderInitialQuestion()}
          {step === 'kietLogin' && renderKietLogin()}
          {step === 'otherLogin' && renderOtherLogin()}
          {step === 'emailPasswordLogin' && renderEmailPasswordLogin()}
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
          {(step === 'otherLogin' || step === 'emailPasswordLogin') && (
             <p className="mt-2 text-center text-gray-600">
              Need an account? <Link to="/signup" className="font-medium text-buddy-lavender hover:underline">Sign Up</Link>
            </p>
          )}
           {step === 'kietLogin' && (
             <p className="mt-2 text-center text-gray-600">
              Forgot KIET password? Contact admin.
            </p>
          )}
          <p className="mt-4 text-center text-gray-500">
            <Link to="/" className="hover:underline">
              &larr; Back to Home
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;