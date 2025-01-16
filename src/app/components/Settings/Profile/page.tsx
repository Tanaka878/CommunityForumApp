'use client';
import BASE_URL from '@/app/config/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface User {
  email: string;
  localDate: string;
  id: string;
}

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  console.log(user)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login');
        router.push('/components/Login');
        return;
      }

      try {
        const response = await axios.get<User>(`${BASE_URL}/api/v1/demo-controller/fetch`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData(response.data); // Populate form data with user data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.statusText || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
        router.push('/components/Login');
      }
    };

    fetchUserData();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      // Sending updated data to the server
      const response = await axios.put<User>(`${BASE_URL}/api/v1/demo-controller/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('User data updated successfully!');
      setUser(response.data); // Update user state with the latest data from the server
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating user data:', error.response?.statusText || error.message);
        alert(`Failed to update user data: ${error.response?.data.message || error.message}`);
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred while updating user data.');
      }
    }
  };

  return (
    <div className="p-7 bg-gray-100 h-screen">
      {formData ? (
        <div className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="localDate" className="text-gray-600 font-semibold mb-1">
              Last Login
            </label>
            <input
              type="text"
              id="localDate"
              name="localDate"
              value={formData.localDate}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="id" className="text-gray-600 font-semibold mb-1">
              User ID
            </label>
            <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                className="p-2 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
                disabled
                />

          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <p className="text-gray-700">Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
