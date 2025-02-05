'use client';

import BASE_URL from '@/app/config/api';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [nicknames, setNicknames] = useState<string[]>([]);
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

  // Fetch nicknames
  useEffect(() => {
    const fetchNicknames = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/communities/getNicknames`);
        if (response.ok) {
          const nicknamesData = await response.json();
          setNicknames(nicknamesData);
        }
      } catch (error) {
        console.error('Error fetching nicknames:', error);
      }
    };

    fetchNicknames();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (nicknames.includes(nickname.trim())) {
      setError('Nickname already exists');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const credentials = { email, password, nickname };

    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/components/Login');
    } catch (error) {
      console.log(error)
      setError('Sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
            Create Account
          </h2>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nickname Field */}
            <div>
              <label 
                htmlFor="nickname" 
                className="block text-sm font-medium text-gray-700 mb-1 slide-in opacity-0 translate-x-full"
              >
                Nickname
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 slide-in opacity-0 translate-x-full"
                required
                disabled={loading}
              />
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-gray-700 mb-1 slide-in opacity-0 translate-x-full"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Login button */}
            <button
              type="button"
              onClick={() => router.push('/components/Login')}
              disabled={loading}
              className={`w-full p-3 rounded-md transition-colors duration-200 slide-in opacity-0 translate-x-full
                ${loading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;