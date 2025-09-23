"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, User, Loader2, ChevronLeft, ArrowBigLeftDash } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const RedirectHome = () => {
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Attempting login for:", username);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers.get("content-type"));

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Login endpoint not found. Please check server configuration."
          );
        }
        throw new Error(`Server error: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      console.log("Login response:", data);

      if (data.success) {
        toast.success("Login successful!", {
          description: "Redirecting to dashboard...",
        });
        // Small delay for better UX
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      } else {
        toast.error("Login failed", {
          description:
            data.message ||
            "Invalid credentials. Please check your username and password.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Connection Error", {
        description:
          error instanceof Error
            ? error.message
            : "Unable to connect to the server. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <Button onClick={RedirectHome} className="absolute top-12 left-12 text-white bg-blue-400 p-4 rounded">
          <ArrowBigLeftDash className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="email"
                    placeholder="Enter your email address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 hover:border-gray-300 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-blue-500 hover:border-gray-300 transition-colors"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading || !username.trim() || !password.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Authorized Personnel Only</strong>
                </p>
                <p className="text-xs text-gray-600 text-center mt-1">
                  Please use your assigned email address and password to access
                  the admin dashboard.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
