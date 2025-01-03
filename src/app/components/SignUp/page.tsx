/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const SignUp= () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName]  = useState('')
  const[confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  
   
    useEffect(() => {
      const elements = document.querySelectorAll('.slide-in');
      
      elements.forEach((el, index) => {
        // Check if `el` is an HTMLElement before applying styles
        if (el instanceof HTMLElement) {
          el.classList.remove('opacity-0', 'translate-x-full');
          el.classList.add('opacity-100', 'translate-x-0');
          el.style.animationDelay = `${index * 0.2}s`; // Stagger the animation for each element
        }
      });
    }, []);
    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const credentials = { email, password ,firstName}

    if(password === confirmPassword){
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/register/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            })
      
            if (!response.ok) {
              throw new Error('Login failed')
            }
      
            const data = await response.json()
      
      
            // Store the JWT token in localStorage (you can also use sessionStorage)
            localStorage.setItem('token', data.token)
            
      
            // Redirect to a secure page or show success message
            router.push('/components/Login')
            console.log('Login successful!')
          } catch (error) {
            setError('Invalid credentials, please try again.')
          }

    }else{
        setError('Passwords do not match')
    }

    
  }

  return (
    <div className="ml-auto mr-auto w-full max-w-sm p-4">
      <h1 className="text-3xl font-extrabold text-center slide-in opacity-0 translate-x-full">Create Account</h1>

      <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 slide-in opacity-0 translate-x-full">Username</label>
          <input
          
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md slide-in opacity-0 translate-x-full"
            required
          />
        </div>



        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 slide-in opacity-0 translate-x-full">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md slide-in opacity-0 translate-x-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 slide-in opacity-0 translate-x-full">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-white-300 rounded-md slide-in opacity-0 translate-x-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 slide-in opacity-0 translate-x-full">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-white-300 rounded-md slide-in opacity-0 translate-x-full"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm mb-4 slide-in opacity-0 translate-x-full">{error}</div>}

        <button
          type="submit"
          className="mb-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 slide-in opacity-0 translate-x-full"
        >
          Create Account
        </button>
        <button
        onClick={()=>router.push('/components/Login')}
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2 slide-in opacity-0 translate-x-full"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default SignUp
