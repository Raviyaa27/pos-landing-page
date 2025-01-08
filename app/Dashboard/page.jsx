"use client";

import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "../../config.js";

function Dashboard() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/"); // Redirect to login page
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">
        Welcome to the Dashboard, {user ? user.displayName : "Guest"}
      </h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
      >
        Sign out
      </button>
    </div>
  );
}

export default Dashboard;
