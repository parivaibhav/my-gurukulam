"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    if (value.trim() !== "") {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.toLowerCase().trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect based on role
      switch (data.role) {
        case "admin":
          router.push("/dashboard/admin");
          break;
        case "clerk":
          router.push("/dashboard/clerk");
          break;
        case "teacher":
          router.push("/dashboard/teacher");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col mt-4 bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="flex flex-1 items-center justify-center px-4 py-20">
          <Card className="w-full max-w-md rounded-3xl overflow-hidden">
            <CardHeader className="flex flex-col items-center space-y-4 pt-10">
              <Image
                src="/gurukul-logo.png"
                width={100}
                height={100}
                alt="Gurukul Logo"
                className="rounded-full border-2 border-white shadow-lg"
              />
              <CardTitle className="text-2xl font-bold">
                Login to Your Account
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-10 bg-white">
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition"
                >
                  {submitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
