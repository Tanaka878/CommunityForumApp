'use client'
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
    const [username, setUsername] = useState({
        nickname: '',
        userEmail: '',
        userpassword: ''
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsername((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission (simulate data fetching)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for data fetching logic
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(username),
        });

        if (response.ok) {
            // handle successful signup
            alert('Sign up successful');
        } else {
            // handle errors
            alert('Signup failed');
        }
    };

    // Handle Google login
    const handleGoogleLogin = async (response: any) => {
        const token = response.credential;
        // Send the token to your backend for verification and user creation
        const res = await fetch('/api/google-signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        });

        if (res.ok) {
            // handle successful Google sign-up
            alert('Google sign up successful');
        } else {
            // handle errors
            alert('Google sign-up failed');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-extrabold text-center text-indigo-500 mb-4">SIGN UP</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="nickname"
                        placeholder="Username"
                        required
                        value={username.nickname}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="relative">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="userEmail"
                        placeholder="someone@gmail.com"
                        required
                        value={username.userEmail}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="userpassword"
                        placeholder="*******"
                        required
                        value={username.userpassword}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Sign Up
                </button>
            </form>

            {/* Google Sign Up Button */}
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                <div className="mt-4">
                    <GoogleLogin 
                        onSuccess={handleGoogleLogin} 
                        onError={() => alert('Google sign-in failed')}
                        useOneTap
                    />
                </div>
            </GoogleOAuthProvider>
        </div>
    );
};

export default SignUp;
