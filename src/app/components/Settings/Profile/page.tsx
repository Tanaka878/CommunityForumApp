// Client-side React Component
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BASE_URL from '@/app/config/api';

interface User{
  nickname: string,
  email: string,
  numberOfGroups:string
  dateJoined: string

}
const Profile = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userIdRef = useRef<string | null>(null);
  
  const [userData, setUserData] = useState<User | null>(null)

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

  //fectching the user data from the backend
  const profileData = async()=>{

    const response = await fetch(`${BASE_URL}/api/communities/getProfileData/${userIdRef.current}`);

    if(response.ok){
      const data = await response.json()
      setUserData(data)

      console.log("Nickkkk",userData);

    }
    else{
      setError("Failed to fect Data")
    }
  }

  useEffect(()=>{
    profileData();
  })

  console.log(userData)

  return (
    <div className="text-black p-4 bg-white min-h-screen">
      <nav className="flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
      </nav>

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center gap-2">
          {loading ? (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full shadow-lg">
              <span className="text-gray-500 text-sm">Loading...</span>
            </div>
          ) : profileImage ? (
            <Image
              src={profileImage}
              alt="Profile Image"
              height={350}
              width={350}
              className="rounded-full w-32 h-32 object-cover shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full shadow-lg">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
          <label
            htmlFor="image-upload"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-all"
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
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>

      <div className='flex justify-center items-center'>
        <h2>Nickname : </h2>
        <h2><span>{userData?.nickname}</span></h2>
      </div>

      <div className='flex justify-center items-center'>
        <h2>Email : </h2>
        <h2><span>{userData?.email}</span></h2>
      </div>

      <div className='flex justify-center items-center'>
        <h2>Groups Joined : </h2>
        <h2><span>{userData?.numberOfGroups}</span></h2>
      </div>

      <div className='flex justify-center items-center'>
        <h2>Join Date : </h2>
        <h2><span>{userData?.numberOfGroups}</span></h2>
      </div>


      <nav className="mt-8 flex justify-center">
        <button
          aria-label="Go back to settings homepage"
          onClick={handleNavigateBack}
          className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
        >
          <FaArrowLeft className="w-5 h-5" />
          Back
        </button>
      </nav>
    </div>
  );
};

export default Profile;
