"use client";
import React, { useEffect, useState } from "react";
import ProfileImage from "../ProfileImage";
import PersonalData from "../../ProfileData/PersonalData";
import GroupCommunityCard from "../../GroupCard/CommunityCard";
import SearchBar from "../../SearchBar/SearchBar";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define the type for the user object
interface User {
  email: string;
  localDate: string;
}

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // State is either User or null

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, redirecting to login");
      router.push("/components/SignUp");
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
        setUser(response.data); // Update state with user data
        console.log("User data:", response.data.email);
      })
      .catch((error) => {
        console.error("Error:", error.response?.statusText || error.message);
        router.push("/components/SignUp");
      });
  }, [router]);

  const handleSearch = () => {
    console.log("Search triggered");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    window.location.href = "/";
  };

  if (!user) {
    // Optionally show a loading spinner or placeholder while user data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="flex bg-slate-600">
        <ProfileImage />
        <PersonalData name={user.email} joinDate={user.localDate} />
      </nav>

      <nav className="mt-2">
        <h1 className="border-l-fuchsia-500 mt-2 font-extrabold justify-center mx-auto">
          Communities
        </h1>
      </nav>

      <SearchBar onSearch={handleSearch} />

      <nav>
        <h2>Explore</h2>
        <nav className="flex"></nav>
      </nav>

      <div>
        <h2 className="font-extrabold flex justify-center items-center">
          My Communities
        </h2>
        <div className="grid mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <GroupCommunityCard />
          <GroupCommunityCard />
          <GroupCommunityCard />
          <GroupCommunityCard />
          <GroupCommunityCard />
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transform transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
