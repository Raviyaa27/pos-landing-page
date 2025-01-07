"use client";

import { useState, useEffect } from "react";
import {app,auth} from "../../config";
import dashboard from "../dashboard/page";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

// function page() {
const SignInPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Starting auth onAuthStateChanged observer");
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
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Sign in successful");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="flex justify-center gap-8">
      {user ? (
        //user is logged in, render dashboard or redirect to the dashboard
        <dashboard />
      ) : (
        //user is not logged in , render the login button
        <button onClick={signInWithGoogle} className="p-6 flex gap-4">
          <Image src="/google.png" width={30} height={30} alt="google" />
          Sign up with Google
        </button>
      )}
    </div>
  );
};

export default SignInPage;

{
  /* <button className="p-6 flex gap-4">
              <Image src="/google.png" width={30} height={30} alt="google" />
              Sign up with Google
            </button> */
}
