
'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import BASE_URL from '@/app/config/api';
import Lottie from 'lottie-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const router = useRouter();

  // Fetch animation data
  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch("/Images/login.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load animation:', error);
      }
    };
    fetchAnimation();
  }, []);

  // Handle slide-in animations
  useEffect(() => {
    const elements = document.querySelectorAll('.slide-in');
    elements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        el.classList.remove('opacity-0', 'translate-x-full');
        el.classList.add('opacity-100', 'translate-x-0');
        el.style.animationDelay = `${index * 0.2}s`;
      }
    });
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const credentials = { email, password };

    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/authenticate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Save auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem("email", credentials.email);
      
      // Navigate to dashboard
      router.push("/components/GroupsContainer/Container");
      
    } catch (error) {
      console.log(error)
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Navigation handlers
  const handleSignUp = () => {
    router.push('/components/SignUp');
  };

  const handlePrivacyPolicy = () => {
    router.push('/privacy-policy'); 
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50">
      {/* Animation background */}
      <div className="fixed inset-0 z-0">
        {animationData && (
          <Lottie 
            loop
            className="w-full h-full object-cover"
            animationData={animationData}
          />
        )}
      </div>

      {/* Main content */}
      <div className="w-full max-w-sm p-4 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
          {/* Logo/Title */}
          <h1 className="flex justify-center text-center text-black font-extrabold text-xl sm:text-2xl mb-6">
            <span className="text-red-600">C</span>
            <span>ommunity</span>
            <span className="text-blue-500">-F</span>
            <span>orum</span>
          </h1>

          <h2 className="text-3xl font-extrabold text-center mb-8 slide-in opacity-0 translate-x-full">
            Login
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1 slide-in opacity-0 translate-x-full"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 slide-in opacity-0 translate-x-full"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1 slide-in opacity-0 translate-x-full"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 slide-in opacity-0 translate-x-full"
                required
                disabled={loading}
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-500 text-sm slide-in opacity-0 translate-x-full">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-md transition-colors duration-200 slide-in opacity-0 translate-x-full
                ${loading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Sign up button */}
            <button
              onClick={handleSignUp}
              type="button"
              disabled={loading}
              className={`w-full p-3 rounded-md transition-colors duration-200 slide-in opacity-0 translate-x-full
                ${loading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <footer className="mt-6 text-center">
            <button 
              onClick={handlePrivacyPolicy}
              className="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200"
              disabled={loading}
            >
              Privacy Policy
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;