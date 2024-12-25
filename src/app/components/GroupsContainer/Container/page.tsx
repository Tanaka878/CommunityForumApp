"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

  return (
    <div>
      {}
      

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
