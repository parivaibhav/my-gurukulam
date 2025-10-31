"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "loading" | "sent" | "error"
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send email");
      setStatus("sent");
      setMessage(data.message || "Reset link sent successfully!");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/80 shadow-xl border border-gray-200">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mb-2 bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-full"
            >
              <Mail className="w-6 h-6" />
            </motion.div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-gray-500">
              Enter your email, and we'll send you a reset link.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all"
              >
                {status === "loading" ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" /> Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            {/* Feedback Messages */}
            {status === "sent" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Alert className="border-green-300 bg-green-50 text-green-700">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Alert className="border-red-300 bg-red-50 text-red-700">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-500">
            Remembered your password?
            <a href="/login" className="text-blue-600 ms-2 hover:underline">
              Back to Login
            </a>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
