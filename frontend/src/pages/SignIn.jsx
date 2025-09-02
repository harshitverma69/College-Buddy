import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"; // Import useToast

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + '/api/auth';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast(); // Initialize useToast

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('SignInPage: handleEmailPasswordLogin triggered');
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log('Login API response data:', data);

      if (response.ok) {
        login(data.user); // Token is now in httpOnly cookie
        toast({
          title: "Login Successful",
          description: "You have been logged in.",
          variant: "success",
        });
        navigate("/");
      } else {
        console.error('Login API error response:', data);
        if (response.status === 403 && data.msg.includes('Email not verified')) {
          toast({
            title: "Login Failed",
            description: data.msg,
            variant: "destructive",
          });
          navigate('/verify-otp', { state: { email: email } });
        } else {
          toast({
            title: "Login Failed",
            description: data.msg || "An error occurred during login.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: `Login failed: ${error.message}`,
        variant: "destructive",
      });
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-outfit text-buddy-lavender">Sign In</CardTitle>
          <CardDescription className="text-center pb-2">
            Sign in with your email and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
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
              <Label htmlFor="password-email">Password</Label>
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
            <div className="text-sm text-right">
              <Link to="/forgot-password" className="font-medium text-buddy-lavender hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full cta-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
          <p className="mt-2 text-center text-gray-600">
            Need an account?{' '}
            <Link to="/signup" className="font-medium text-buddy-lavender hover:underline">
              Sign Up
            </Link>
          </p>
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