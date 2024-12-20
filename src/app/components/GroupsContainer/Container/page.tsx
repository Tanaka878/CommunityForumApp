"use client";
import React, { useEffect } from "react";
import ProfileImage from "../ProfileImage";
import PersonalData from "../../ProfileData/PersonalData";
import GroupCommunityCard from "../../GroupCard/CommunityCard";
import SearchBar from "../../SearchBar/SearchBar";
import { useRouter } from "next/navigation";
import axios from "axios";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, redirecting to login");
      router.push("/components/SignUp"); // Redirect if token is missing
      return;
    }

    // Validate token with backend
    axios
      .get("http://localhost:8080/api/v1/demo-controller/fetch", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User data:", response.data);
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
    // Clear any authentication data (e.g., token) from storage
    localStorage.removeItem("token");
    console.log("User logged out");
    // Optionally redirect the user to the login page or home
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="flex bg-slate-600">
        <ProfileImage />
        <PersonalData />
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
