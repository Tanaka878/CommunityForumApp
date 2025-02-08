"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaCog, FaComment, FaThumbtack,  FaSignOutAlt } from "react-icons/fa";
import Explore from "../../Explore/Explore";
import SearchBar from "../../SearchBar/SearchBar";
import PinnedChat from "../../PinnedChats/PinnedChats";
import BASE_URL from '@/app/config/api';
import GroupList from "../../AllChats/page";

interface User {
  email: string;
  localDate: string;
  id: string;
  nickname: string;
}

interface CommunityData {
  id: number;
  communityName: string;
  communityDescription: string;
  communitySize: number;
  groupName: string;
}

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [communities, setCommunities] = useState<CommunityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function pictureSelection(communityId: number): string {
    switch (communityId) {
      case 1:
        return "/Images/web dev.jpg";

      case 2:
        return "/Images/gamers.jpeg";

      case 3:
        return "/Images/career.png";

      case 4:
        return "/Images/music-lover.webp";

      case 5:
        return "/Images/jsscript.png";

      case 6:
        return "/Images/javaImg0.png";

      case 7 :
        return "/Images/hiking.jpeg";

      case 8 :
        return "/Images/food-lover.png";

      case 9 : 
        return "/Images/animal-lover.jpeg";

      default:
        return "/Images/noImage.jpeg"
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/components/Login");
      return;
    }

    axios
      .get<User>(`${BASE_URL}/api/v1/demo-controller/fetch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("nickname", response.data.nickname);
      })
      .catch(() => {
        router.push("/components/Login");
      });
  }, [router]);

  const fetchCommunities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/communities/getAll`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
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
    router.push(`/components/Settings/HomePage?id=${user?.id}`);
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white shadow'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-gray-800 font-serif">
                Community Forum
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleSettings}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaCog className="text-gray-600 text-xl hover:text-gray-800" />
              </button>
              <div className="h-8 w-px bg-gray-200"></div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Explore Section */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Explore Communities</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {error ? (
                <p className="text-red-500 px-4">{error}</p>
              ) : (
                communities.map((community) => (
                  <Explore
                    key={community.id}
                    groupId={community.id}
                    image={pictureSelection(community.id)}
                    groupName={community.communityName}
                    description={community.communityDescription}
                  />
                ))
              )}
            </div>
          </section>

          {/* Pinned Communities */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <FaThumbtack className="mr-2 text-blue-500" />
              Popular Communities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                communities.map((community) => (
                  <PinnedChat
                    key={community.id}
                    groupId={community.id}
                    image={pictureSelection(community.id)}
                    groupName={community.communityName}
                    description={community.communityDescription}
                  />
                ))
              )}
            </div>
          </section>

          {/* My Communities */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <FaComment className="mr-2 text-blue-500" />
              My Communities
            </h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <GroupList />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;