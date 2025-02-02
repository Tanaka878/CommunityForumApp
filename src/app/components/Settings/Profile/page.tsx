'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BASE_URL from '@/app/config/api';

interface User {
  nickname: string;
  email: string;
  numberOfGroups: string;
  dateJoined: string;
}

const Profile = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userIdRef = useRef<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('id');
    if (storedId) {
      userIdRef.current = storedId;
      fetchImage();
    } else {
      setError('No user ID found in local storage.');
    }
  }, []);

  const fetchImage = async () => {
    if (!userIdRef.current) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/profile?userId=${userIdRef.current}`);
      const data = await response.json();

      if (response.ok) {
        setProfileImage(data.ImageData);
      } else {
        setError(data.error || 'Error fetching image');
      }
    } catch (error) {
      setError('Error fetching image');
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result as string;
        setProfileImage(base64Image);

        try {
          const response = await fetch(`/api/profile?userId=${userIdRef.current}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userIdRef.current,
              ImageData: base64Image,
            }),
          });

          const data = await response.json();
          if (response.ok) {
            console.log('Image uploaded successfully:', data.message);
          } else {
            setError(data.error || 'Error uploading image');
          }
        } catch (error) {
          setError('Error uploading image');
          console.error('Error uploading image:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNavigateBack = (): void => {
    router.push('/components/Settings/HomePage');
  };

  const profileData = async () => {
    const response = await fetch(`${BASE_URL}/api/communities/getProfileData/${userIdRef.current}`);

    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    } else {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <div className="text-black p-6 bg-gray-50 min-h-screen">
      <nav className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Profile</h1>
      </nav>

      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-4">
          {loading ? (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full shadow-lg animate-pulse">
              <span className="text-gray-500 text-sm">Loading...</span>
            </div>
          ) : profileImage ? (
            <Image
              src={profileImage}
              alt="Profile Image"
              height={120}
              width={120}
              className="rounded-full object-cover shadow-md border-4 border-white"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full shadow-lg">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
          <label
            htmlFor="image-upload"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all"
          >
            {selectedImage ? 'Change Image' : 'Upload Image'}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
      </div>

      <div className="mt-8 grid gap-4 text-left max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Nickname:</span>
          <span className="text-gray-900">{userData?.nickname || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{userData?.email || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Groups Joined:</span>
          <span className="text-gray-900">{userData?.numberOfGroups || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Join Date:</span>
          <span className="text-gray-900">{userData?.dateJoined || 'N/A'}</span>
        </div>
      </div>

      <nav className="mt-12 flex justify-center">
        <button
          aria-label="Go back to settings homepage"
          onClick={handleNavigateBack}
          className="flex items-center gap-2 px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-md"
        >
          <FaArrowLeft className="w-5 h-5" />
          Back
        </button>
      </nav>
    </div>
  );
};

export default Profile;
