"use client";

import { useState, useEffect } from "react";
import { app, auth } from "../../config";
import Dashboard from "../dashboard/page";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const SignInPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/dashboard"); // Redirect to dashboard when user is logged in
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirect to dashboard after successful sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {user ? (
        <Dashboard />
      ) : (
        <Button onClick={signInWithGoogle} variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
      )}
    </div>
  );
};

export default SignInPage;
