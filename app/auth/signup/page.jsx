"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Eye, EyeOff, Facebook, Mail } from "lucide-react";
import Link from "next/link";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../config";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState({});
  const { signUp, loading, error: firebaseError } = useFirebaseAuth();
  const router = useRouter();

  // Google Sign-In logic
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirect to dashboard after successful sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleSignUpWithEmailPassword = async (e) => {
    e.preventDefault();
    const errors = {};

    // Validate inputs
    if (!validateEmail(email)) errors.email = "Invalid email address.";
    if (!validateUsername(username))
      errors.username = "Username must be at least 3 characters.";
    if (!validatePassword(password))
      errors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    try {
      await signUp(email, password);
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setFormError({});
      setSuccessMessage("User created successfully! Please log in.");
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setFormError({
          general: "The email address is already in use by another account.",
        });
      } else if (e.code === "auth/invalid-email") {
        setFormError({ general: "The email address is not valid." });
      } else if (e.code === "auth/weak-password") {
        setFormError({
          general:
            "The password is too weak. Please use at least 6 characters.",
        });
      } else {
        setFormError({ general: e.message || "An unexpected error occurred." });
      }
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
            <h1 className="text-3xl font-bold tracking-tighter">Sign Up</h1>
            <p className="text-muted-foreground">Create an account</p>
          </div>

          {/* Success message */}
          {successMessage && (
            <p className="text-green-500 text-sm text-center">
              {successMessage}
            </p>
          )}

          {/* Error messages */}
          {formError.general && (
            <p className="text-red-500 text-sm text-center">
              {formError.general}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSignUpWithEmailPassword}>
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {formError.username && (
                <p className="text-red-500 text-xs">{formError.username}</p>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {formError.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {formError.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
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
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary-500 hover:text-primary-600 font-medium underline"
            >
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
