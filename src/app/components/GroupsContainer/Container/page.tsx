"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaCog, FaComment } from "react-icons/fa";
import Explore from "../../Explore/page";
import SearchBar from "../../SearchBar/SearchBar";
import { FaThumbtack } from "react-icons/fa";
import PinnedChat from "../../PinnedChats/page";
import ChatDisplay from "../../AllChats/page";

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

 /* const handleSearch = () => {
    console.log("Search triggered");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    window.location.href = "/";
  };
  */

  if (!user) {
    // Optionally show a loading spinner or placeholder while user data is being fetched
    return <div>Loading...</div>;
  }

  function Settings(): void {
    throw new Error("Function not implemented.");
  }

  function Search(query: string): void {
    console.log(query)
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <nav className="flex mx-auto justify-between p-2">
          <h2 className="font-bold font-serif">Messages</h2>
          <button onClick={Settings}>
            <FaCog className="bg-blend-color-burn"></FaCog>
          </button>

      </nav>

      {/** For containing exploration Communities*/}
      <nav className="p-5 flex space-x-3">
        <Explore/>
        <Explore/>
        <Explore/>
        <Explore/>
      </nav>

    {/**Container for search bar */}
      <nav className="mb-2 p-1">
        <SearchBar onSearch={Search}/>

      </nav>

{/**Container for Pinend chats */}
      <nav>
        <h1 className="flex font-semibold rounded-lg space-x-3">
          <FaThumbtack/>
          Pinned Communities
        </h1>

        <nav className="rounded-lg bg-slate-300 mt-2 flex space-x-2 p-1 overflow-x-auto w-full">
          <PinnedChat/>
          <PinnedChat/>
          <PinnedChat/>
          <PinnedChat/>
        </nav>

      </nav>

      {/**All communites Joined by uuser */}

      <nav className="mt-1 p-1">
        <h1 className="flex font-semibold space-x-1">
          <FaComment/>
          My Communities
        </h1>
        <nav className="space-y-1">
          <ChatDisplay/>
          <ChatDisplay/>
          <ChatDisplay/>
          
        </nav>
      </nav>
      

     
    


      

    {/*
     <div className="flex justify-center mt-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transform transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Logout
        </button>
      </div>
    */ }  {/* Logout Button */}
     
    </div>
  );
};

export default HomePage;
