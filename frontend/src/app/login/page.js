"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const router = useRouter();
  const recaptchaRef = useRef(null);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    if (value.trim() !== "") setErrors({ ...errors, [id]: "" });
  };

  const handleCaptchaChange = (token) => {
    setCaptcha(token);
    if (token) setErrors((prev) => ({ ...prev, captcha: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    if (!captcha) newErrors.captcha = "Please verify captcha";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email.toLowerCase().trim(),
          password: form.password,
          captcha, // ✅ backend expects this key
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      toast.success(" Login successful!");

      setTimeout(() => {
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
      }, 800);
    } catch (err) {
      toast.error(` ${err.message}`);
    } finally {
      setSubmitting(false);
      recaptchaRef.current?.reset();
      setCaptcha(null);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white py-12 px-4">
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm md:max-w-md"
          >
            <Card className="w-full rounded-3xl shadow-2xl border border-orange-100 backdrop-blur-sm bg-white/95 overflow-hidden">
              <CardHeader className="flex flex-col items-center space-y-3 pt-8">
                <Image
                  src="/gurukul-logo.png"
                  width={80}
                  height={80}
                  alt="Gurukul Logo"
                  className="rounded-full border-2 border-orange-500 shadow-md"
                />
                <CardTitle className="text-2xl -m-0.5 font-extrabold text-gray-800 text-center">
                  Welcome Back
                </CardTitle>
                <p className="text-sm text-gray-500 text-center max-w-xs">
                  Login to access your personalized dashboard
                </p>
              </CardHeader>

              <CardContent className="mt-4 px-6 pb-6">
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  {/* Email */}
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`mt-2 py-3 text-base focus:ring-2 focus:ring-orange-500 rounded ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
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
                      className={`mt-2 py-3 text-base focus:ring-2 focus:ring-orange-500 rounded ${
                        errors.password ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {/* Forgot password */}
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-orange-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* reCAPTCHA */}
                  <div className="flex flex-col items-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Le_7vgrAAAAADVPrAB0aHUmDuGlVm5iMOxT5HO6" // 🔑 use site key here
                      onChange={handleCaptchaChange}
                      theme="light"
                    />
                    {errors.captcha && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.captcha}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 font-semibold bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg hover:scale-105 transition-transform duration-300 rounded-xl"
                  >
                    {submitting ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
      <Toaster richColors position="top-left" closeButton />
    </>
  );
}
