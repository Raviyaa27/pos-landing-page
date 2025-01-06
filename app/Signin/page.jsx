"use client";

import { useState, useEffect } from "react";
import app from "../../config";
import Dashboard from "../dashboard/page";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

// function page() {
const SignInPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Starting auth onAuthStateChanged observer");
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    console.log("Attempting to sign in with Google");
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Sign in successful");
      router.push("/Dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        //user is logged in, render dashboard or redirect to the dashboard
        <Dashboard />
      ) : (
        //user is not logged in , render the login button
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In With Google
        </button>
      )}
    </div>
  );
};

export default SignInPage;
