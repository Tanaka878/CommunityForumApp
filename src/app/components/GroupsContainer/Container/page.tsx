"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaCog, FaComment, FaThumbtack } from "react-icons/fa";
import Explore from "../../Explore/page";
import SearchBar from "../../SearchBar/SearchBar";
import PinnedChat from "../../PinnedChats/page";
import ChatDisplay from "../../AllChats/page";

interface User {
  email: string;
  localDate: string;
}

interface CommunityData {
  id: number;
  communityName: string;
  communityDescription: string;
  communitySize: number;
  groupName: string
}

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [communities, setCommunities] = useState<CommunityData[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**Logic for picture selection */
  function pictureSelection(communityId: number): string {
    switch (communityId) {
        case 1:
            return "/Images/music-lover.webp";
        case 2:
            return "/Images/food-lover.png";
        default:
            return "/Images/animal-lover.jpeg";
    }
}


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, redirecting to login");
      router.push("/components/Login");
      return;
    }

    // Validate token with backend
    axios
      .get<User>("http://localhost:8080/api/v1/demo-controller/fetch", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log("User data:", response.data.email);
      })
      .catch((error) => {
        console.error("Error:", error.response?.statusText || error.message);
        router.push("/components/SignUp");
      });
  }, [router]);

  const fetchCommunities = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/communities/getAll"); // Replace with your actual backend URL
      if (!response.ok) {
        console.log("data fetched")
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setCommunities(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    window.location.href = "/";
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-2 bg-white shadow">
        <h2 className="text-lg font-bold font-serif">Messages</h2>
        <button onClick={handleSettings}>
          <FaCog className="text-gray-600 hover:text-gray-800 transition" />
        </button>
      </nav>

      {/* Explore Section */}
      <section className="flex p-4 space-x-3 bg-white shadow mt-2 rounded-lg overflow-x-auto">
  {error ? (
    <p className="text-red-500">{error}</p>
  ) : (
    communities.map((community) => (
      <Explore
        key={community.id}
        groupId={community.id}
        image={pictureSelection(community.id)} 
        groupName={community.communityName}
      />
    ))
  )}
</section>


      {/* Search Bar */}
      <section className="mt-4 px-4">
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Pinned Communities */}
      <section className="mt-6 px-4">
        <h1 className="flex items-center text-lg font-semibold">
          <FaThumbtack className="mr-2" />
          Pinned Communities
        </h1>
        <div className="flex mt-2 space-x-3 overflow-x-auto bg-gray-200 p-2 rounded-lg">
          <PinnedChat />
          <PinnedChat />
          <PinnedChat />
          <PinnedChat />
        </div>
      </section>

      {/* My Communities */}
      <section className="mt-6 px-4">
        <h1 className="flex items-center text-lg font-semibold">
          <FaComment className="mr-2" />
          My Communities
        </h1>
        <div className="space-y-2 mt-1">
          <ChatDisplay />
          <ChatDisplay />
          <ChatDisplay />
        </div>
      </section>

      {/* Logout Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
