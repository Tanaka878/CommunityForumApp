'use client';

import BASE_URL from '@/app/config/api';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [nicknames, setNicknames] = useState<string[]>([]);
  const router = useRouter();

  // Fetch nicknames when the component mounts
  useEffect(() => {
    const fetchNicknames = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/communities/getNicknames`);
        if (response.ok) {
          const nicknamesData = await response.json();
          setNicknames(nicknamesData); // Assuming API returns an array of nicknames
        } else {
          setError('Failed to fetch nicknames');
        }
      } catch (error) {
        console.log(error)
        setError('An error occurred while fetching nicknames');
      }
    };

    fetchNicknames();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Check if nickname already exists
    if (nicknames.includes(nickname.trim())) {
      setError('Nickname already exists');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
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

      // Store the JWT token and redirect
      localStorage.setItem('token', data.token);
      router.push('/components/Login');
    } catch (error) {
      console.log(error)
      setError('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="ml-auto mr-auto w-full max-w-sm p-4">
      <h1 className="text-3xl font-extrabold text-center">Create Account</h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={() => router.push('/components/Login')}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
