// 

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Eye, EyeOff, Facebook, Mail } from "lucide-react";
import Link from "next/link";
import { validateEmail } from "../../utils/validation"; // Assuming you have validation utils
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../config";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Google Sign-In logic
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // Force account selection every time
    provider.setCustomParameters({
      prompt: "select_account",
    });
    
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      setFormError({ general: "Failed to sign in with Google." });
    }
  };

  // // Handle email/password login
  // const handleLoginWithEmailPassword = async (e) => {
  //   e.preventDefault();
  //   setFormError({});
  //   const errors = {};

  //   // Validate inputs
  //   if (!validateEmail(email)) errors.email = "Invalid email address.";
  //   if (!password) errors.password = "Password is required.";

  //   if (Object.keys(errors).length > 0) {
  //     setFormError(errors);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     setEmail("");
  //     setPassword("");
  //     setFormError({});
  //     router.push("/dashboard"); // Redirect on successful login
  //   } catch (e) {
  //     console.error("Login error:", e);
  //     if (e.code === "auth/user-not-found") {
  //       setFormError({ general: "No account found with this email." });
  //     } else if (e.code === "auth/wrong-password") {
  //       setFormError({ general: "Incorrect password." });
  //     } else {
  //       setFormError({ general: "Failed to log in. Please try again." });
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLoginWithEmailPassword = async (e) => {
    e.preventDefault();
    setFormError({}); // Clear previous errors
    const errors = {};

    // Validate inputs
    if (!validateEmail(email)) errors.email = "Invalid email address.";
    if (!password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setFormError({});
      router.push("/dashboard"); // Redirect on successful login
    } catch (error) {
      console.error("Login error code:", error.code); // Debugging

      // Map Firebase error codes to user-friendly messages
      let errorMessage;
      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many login attempts. Please try again later.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please check again.";
          break;
        case "auth/invalid-credential":
          errorMessage =
            "Invalid credentials. Please check your email and password.";
          break;
        default:
          errorMessage = "Login failed. Please try again.";
      }

      setFormError({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          {/* General error message */}
          {formError.general && (
            <p className="text-red-500 text-sm text-center">
              {formError.general}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleLoginWithEmailPassword}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {formError.email && (
                <p className="text-red-500 text-xs">{formError.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formError.password && (
                <p className="text-red-500 text-xs">{formError.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={signInWithGoogle}
              variant="outline"
              className="w-full"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>

          <div className="text-center text-sm">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary-500 hover:text-primary-600 font-medium underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
